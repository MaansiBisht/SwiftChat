import React, { useEffect, useState } from "react";
import { useProfile } from "../context/profileContext";
import axios from "axios";
import ChatMessages from "../components/Chat/ChatMessages";
import MessageInputForm from "../components/Chat/MessageInputForm";
import Nav from "../components/Chat/Nav";
import OnlineUsersList from "../components/Chat/OnlineUserList"
import TopBar from "../components/Chat/TopBar";
import { socketUrl } from "../../apiConfig";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { decryptMessage, encryptMessage, fetchPublicKey, getPrivateKey } from "../helper/cryptoUtils";
import toast from "react-hot-toast";
import MessagesHeader from "../components/Chat/MessageHeader";
import { useTheme } from "../context/ThemeContext";
import { getAccessToken, refreshAccessToken } from "../helper/tokenUtils";

const ChatHome = () => {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [offlinePeople, setOfflinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { userDetails } = useProfile();
  const { isAuthenticated, checkAuth } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const showChat = isMobile ? !!selectedUserId : true;
  const showList = isMobile ? !selectedUserId : true;
  const navigate = useNavigate();
  const { mode } = useTheme();

  const mainBg = mode === "dark" ? "bg-gray-800" : "bg-[#F6F9FE]";
  const chatBg = mode === "dark" ? "bg-gray-800" : "bg-[#F6F9FE]";


  const connectToWebSocket = (token) => {
    const ws = new window.WebSocket(`${socketUrl}?token=${token}`);
    ws.addEventListener("message", handleMessage);
    setWs(ws);
    return ws;
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let ws;
    let reconnectAttempts = 0;
    let reconnectTimeout;

    const connect = async () => {
      const token = await getAccessToken(); // Always get the latest token
      ws = connectToWebSocket(token);

      ws.onclose = async (event) => {
        if (event.code === 4001) { // Token expired
          try {
            await refreshAccessToken(); // Refresh the token
            reconnectAttempts = 0;
            connect(); // Reconnect with the new token
          } catch (err) {
            toast.error("Session expired, please log in again.");
            navigate("/login");
          }
        } else {
          // For other disconnects, try to reconnect with exponential backoff + jitter
          reconnectAttempts++;
          const delay = Math.min(1000 * 2 ** reconnectAttempts + Math.random() * 1000, 30000);
          reconnectTimeout = setTimeout(connect, delay);
        }
      };

      ws.onmessage = handleMessage;
      setWs(ws);
    };

    connect();

    return () => {
      if (ws) ws.close();
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
    };
  }, [userDetails]);

  useEffect(() => {
    checkAuth();
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, checkAuth, navigate]);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const res = await axios.get("/api/user/people");
        const offlinePeopleArr = res?.data
          .filter((p) => p._id !== userDetails?._id)
          .filter((p) => !onlinePeople[p._id]);

        const offlinePeopleWithAvatar = offlinePeopleArr.map((p) => ({
          ...p,
          avatarLink: p.avatarLink || "/default-avatar.png",
        }));

        setOfflinePeople(
          offlinePeopleWithAvatar.reduce((acc, p) => {
            acc[p._id] = p;
            return acc;
          }, {})
        );
      } catch (error) {
        console.error("Error fetching people:", error);
      }
    };
    fetchPeople();
  }, [onlinePeople, userDetails]);

  useEffect(() => {
    if (!selectedUserId || !userDetails?._id) return;
  
    const fetchAndDecryptMessages = async () => {
      try {
        const res = await axios.get(`/api/user/messages/${selectedUserId}`);
        const privateKey = await getPrivateKey();
        const decryptedMessages = await Promise.all(
          res.data.map(async (msg) => {
            if (msg.recipient === userDetails._id) {
              try {
                const decryptedText = await decryptMessage(msg.text, privateKey);
                return { ...msg, text: decryptedText };
              } catch (decryptError) {
                console.error("Decryption error:", decryptError);
                return { ...msg, text: "[Decryption failed]" };
              }
            }
            return { ...msg, text: "[Cannot decrypt]" };
          })
        );
        setMessages(decryptedMessages);
      } catch (error) {
        if (error.response?.status === 401) {
          try {
            await refreshAccessToken();
            // Retry after refreshing token
            const retryRes = await axios.get(`/api/user/messages/${selectedUserId}`);
            const privateKey = await getPrivateKey();
            const decryptedMessages = await Promise.all(
              retryRes.data.map(async (msg) => {
                if (msg.recipient === userDetails._id) {
                  try {
                    const decryptedText = await decryptMessage(msg.text, privateKey);
                    return { ...msg, text: decryptedText };
                  } catch (decryptError) {
                    console.error("Decryption error:", decryptError);
                    return { ...msg, text: "[Decryption failed]" };
                  }
                }
                return { ...msg, text: "[Cannot decrypt]" };
              })
            );
            setMessages(decryptedMessages);
          } catch (refreshError) {
            console.error("Token refresh or retry failed:", refreshError);
            navigate("/login");
          }
        } else {
          console.error("Error fetching or decrypting messages:", error);
          toast("Error fetching messages");
        }
      }
    };
  
    fetchAndDecryptMessages();
  }, [selectedUserId, userDetails?._id]);  


  useEffect(() => {
    if (!ws || !userDetails?._id) return;

    const handleRealTimeMessage = async (event) => {
      try {
        const messageData = JSON.parse(event.data);

        // Only handle messages relevant to the current chat
        // (either inbound from selected user, or self-copy sent to yourself for this chat)
        if (
          messageData.text &&
          (
            // Inbound message from selected user
            (messageData.recipient === userDetails._id && messageData.sender === selectedUserId)
            // OR self-copy of outbound message (if you ever send these via WebSocket)
            || (messageData.recipient === userDetails._id && messageData.sender === userDetails._id && messageData.actualRecipient === selectedUserId)
          )
        ) {
          const privateKey = await getPrivateKey();
          const decryptedText = await decryptMessage(messageData.text, privateKey);
          setMessages((prev) => [
            ...prev,
            { ...messageData, text: decryptedText },
          ]);
        }
      } catch (err) {
        console.error("Error handling real-time message:", err);
      }
    };

    ws.addEventListener("message", handleRealTimeMessage);
    return () => {
      ws.removeEventListener("message", handleRealTimeMessage);
    };
  }, [ws, userDetails?._id, selectedUserId]);


  const showOnlinePeople = (peopleArray) => {
    const people = {};
    peopleArray.forEach(({ userId, username, avatarLink }) => {
      if (userId !== userDetails?._id) {
        people[userId] = { username, avatarLink };
      }
    });
    setOnlinePeople(people);
  };

  const handleMessage = (ev) => {
    const messageData = JSON.parse(ev.data);
    if (messageData.online) {
      showOnlinePeople(messageData.online);
    } else if (messageData.text) {
      if (messageData.sender === selectedUserId) {
        setMessages((prev) => [...prev, messageData]);
      }
    }
  };

  const sendMessage = async (ev) => {
    ev.preventDefault();
    if (!newMessage.trim() || !selectedUserId) return;
    if (!ws || ws.readyState !== 1) {
      toast.error("WebSocket not connected");
      return;
    }
    try {
      // Encrypt for recipient
      const recipientPublicKey = await fetchPublicKey(selectedUserId);
      const encryptedForRecipient = await encryptMessage(newMessage, recipientPublicKey);

      // Encrypt for yourself
      const yourPublicKey = await fetchPublicKey(userDetails._id);
      const encryptedForYou = await encryptMessage(newMessage, yourPublicKey);

      // 1. Send to recipient via WebSocket
      ws.send(JSON.stringify({
        sender: userDetails._id,
        recipient: selectedUserId,
        text: encryptedForRecipient,
      }));

      // 2. Save your self-copy to the database
      await axios.post("/api/user/messages", {
        sender: userDetails._id,
        recipient: userDetails._id,
        actualRecipient: selectedUserId,
        text: encryptedForYou,
      });

      // 3. Update UI immediately with plaintext
      setMessages(prev => [
        ...prev,
        {
          text: newMessage, // plaintext for UI
          recipient: userDetails._id, // self-copy recipient is yourself
          sender: userDetails._id,
          actualRecipient: selectedUserId,
          _id: Date.now(), // Temporary ID for UI
          isPending: true, // Mark as pending (optional)
        },
      ]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Error while sending message");
    }
  };

  return (
    <div className={`flex min-h-screen font-sans ${mainBg}`}>
      <Nav />
      <div className="flex-1 flex flex-col">
        <MessagesHeader />
        <div className="flex flex-1">
          {/* Online Users List */}
          {showList && (
            <div className="w-full sm:w-[350px] max-w-full sm:max-w-[350px] min-h-0 h-full">
              <OnlineUsersList
                onlinePeople={onlinePeople}
                selectedUserId={selectedUserId}
                setSelectedUserId={setSelectedUserId}
                offlinePeople={offlinePeople}
              />
            </div>
          )}

          {/* Chat Area */}
          {showChat && (
            <section className={`flex-1 w-full sm:w-[71%] lg:w-[62%] relative pb-10 ${chatBg}`}>
              {selectedUserId && (
                <TopBar
                  selectedUserId={selectedUserId}
                  setSelectedUserId={isMobile ? () => setSelectedUserId(null) : setSelectedUserId}
                  offlinePeople={offlinePeople}
                  onlinePeople={onlinePeople}
                />
              )}
              <ChatMessages
                messages={messages}
                userDetails={userDetails}
                selectedUserId={selectedUserId}
              />
              <div className="absolute w-full bottom-0">
                <MessageInputForm
                  newMessage={newMessage}
                  setNewMessage={setNewMessage}
                  sendMessage={sendMessage}
                  selectedUserId={selectedUserId}
                />
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHome;
