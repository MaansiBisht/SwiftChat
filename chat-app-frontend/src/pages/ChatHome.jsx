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

const ChatHome = () => {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [offlinePeople, setOfflinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { userDetails } = useProfile();
  const { isAuthenticated, checkAuth } = useAuth();
  const navigate = useNavigate();

  const connectToWebSocket = () => {
    const ws = new WebSocket(socketUrl);
    ws.addEventListener("message", handleMessage);
    setWs(ws);
    return ws;
  };

  useEffect(() => {
    const ws = connectToWebSocket();
    console.log(ws);
    return () => {
      // Check if the WebSocket exists and is open or connecting before closing
      if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
        ws.close();
      }
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
    const fetchMessages = async () => {
      if (!selectedUserId || !userDetails?._id) return;
      try {
        const res = await axios.get(`/api/user/messages/${selectedUserId}`);
        const privateKey = await getPrivateKey();
        const decryptedMessages = await Promise.all(
          res.data.map(async (msg) => {
            // Decrypt only messages where recipient is the current user (including self-copy)
            if (msg.recipient === userDetails._id) {
              const decryptedText = await decryptMessage(msg.text, privateKey);
              return { ...msg, text: decryptedText };
            }
            // Messages not decryptable by current user
            return { ...msg, text: "[Cannot decrypt]" };
          })
        );
        setMessages(decryptedMessages);
      } catch (error) {
        console.error("Error fetching or decrypting messages:", error);
        toast("Error fetching messages");
      }
    };
    fetchMessages();
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
    <div className="flex min-h-screen bg-gray-900">
      <Nav />
      <OnlineUsersList
        onlinePeople={onlinePeople}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        offlinePeople={offlinePeople}
      />

      <section className="w-[71%] lg:w-[62%] relative pb-10">
        {selectedUserId && (
          <TopBar
            selectedUserId={selectedUserId}
            setSelectedUserId={setSelectedUserId}
            offlinePeople={offlinePeople}
            onlinePeople={onlinePeople}
          />
        )}

        <ChatMessages
          messages={messages}
          userDetails={userDetails}
          selectedUserId={selectedUserId}
        />

        <div className="absolute w-full bottom-0 flex justify-center">
          <MessageInputForm
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessage={sendMessage}
            selectedUserId={selectedUserId}
          />
        </div>
      </section>
    </div>
  );
};

export default ChatHome;
