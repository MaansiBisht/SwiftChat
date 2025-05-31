import React, { useEffect, useRef } from "react";

const ChatMessages = ({ messages, userDetails, selectedUserId }) => {
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

  return (
    <div
      className="absolute bottom-24 w-full px-7 lg:px-20 left-0 h-[calc(100%-13rem)] overflow-y-auto"
      ref={messagesContainerRef}
    >
      {!!selectedUserId && (
        <div className="flex flex-col gap-2">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`flex ${
                message.sender !== userDetails._id
                  ? "justify-start"
                  : "justify-end"
              }`}
            >
              <div
                className={`text-white ${
                  message.sender !== userDetails._id
                    ? "bg-primary self-start rounded-r-2xl"
                    : "bg-primarySecond self-end rounded-l-2xl"
                } relative group rounded-b-2xl px-5 py-3 max-w-[500px]`}
              >
                <div style={{ wordWrap: "break-word" }}>
                  {message.text}
                </div>
                <div
                  className={`absolute top-0 w-0 h-0 ${
                    message.sender !== userDetails._id
                      ? "border-r-primary -left-4 border-r-[20px]"
                      : "border-l-primarySecond -right-4 border-l-[20px]"
                  } border-b-[20px] border-b-transparent`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedUserId && !messages.length && (
        <div className="text-gray-500 flex items-center justify-center h-full">
          Start a conversation
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
