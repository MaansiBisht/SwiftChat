import React, { useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";

function formatTime(timeStr) {
  return timeStr; // Use your formatting logic
}

const ChatMessages = ({
  messages,
  userDetails,
  selectedUserId,
}) => {
  const { mode } = useTheme();
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // Background and bubble styles
  const chatBg = mode === "dark" ? "bg-gray-900" : "bg-gray-50";
  const bubbleSent = mode === "dark"
    ? "bg-blue-700 text-white"
    : "bg-[#2563eb] text-white";
  const bubbleReceived = mode === "dark"
    ? "bg-gray-800 text-gray-100"
    : "bg-white text-[#1B2559]";
  const timeText = mode === "dark"
    ? "text-gray-400"
    : "text-[#8F9BBA]";

  if (!selectedUserId) {
    return (
      <div className={`flex items-center justify-center h-full ${timeText} ${chatBg} text-base font-sans w-full`}>
        Select a user to start a conversation
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-[76vh] ${chatBg} overflow-hidden w-full`}>
      <div
        className={`
          flex-1 w-full min-h-0 relative overflow-y-auto font-sans
          px-2 py-2 sm:px-8 md:px-16
        `}
        ref={messagesContainerRef}
        style={{ fontFamily: "'Inter', Arial, sans-serif" }}
      >
        <div className="flex flex-col gap-4 pt-2 pb-6">
          {messages.map((message) => {
            const isOwn = message.sender === userDetails._id;
            return (
              <div
                key={message._id}
                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <div className="flex flex-col items-end max-w-[90vw] sm:max-w-[75%]">
                  <div
                    className={`
                      px-5 py-3 rounded-2xl text-[15px] leading-snug
                      ${isOwn ? bubbleSent : bubbleReceived}
                      shadow-sm relative
                      break-words
                      ${isOwn ? "rounded-br-md" : "rounded-bl-md"}
                    `}
                  >
                    {message.text}
                  </div>
                  <span
                    className={`mt-1 text-xs ${timeText} ${isOwn ? "text-right pr-1" : "text-left pl-1"}`}
                  >
                    {formatTime(message.time)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {messages.length === 0 && (
          <div className={`text-gray-400 flex items-center justify-center h-full text-sm`}>
            Start a conversation
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessages;
