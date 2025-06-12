import React from "react";
import { useTheme } from "../../context/ThemeContext";

const MessageInputForm = ({
  selectedUserId,
  newMessage,
  setNewMessage,
  sendMessage,
}) => {
  const { mode } = useTheme();

  // Theme-based classes
  const containerBg =
    mode === "dark" ? "bg-gray-900 border-t border-gray-800" : "bg-gray-50 border-t border-gray-200";
  const inputBg =
    mode === "dark"
      ? "bg-gray-900 border border-gray-700 text-gray-100 placeholder:text-gray-400"
      : "bg-white border border-gray-200 text-[#1B2559] placeholder:text-[#8F9BBA]";
  const sendBtnBg =
    mode === "dark"
      ? "bg-blue-700 hover:bg-blue-800"
      : "bg-blue-100 hover:bg-blue-200";
  const sendIconColor =
    mode === "dark" ? "text-white" : "text-[#2563eb]";

  return (
    <>
      {!!selectedUserId && (
        <div className={`w-full ${containerBg} flex items-center py-4 px-2 sm:px-6`}>
          <form
            onSubmit={sendMessage}
            className="relative w-full flex items-center"
          >
            <input
              type="text"
              className={`
                w-full pr-12 pl-4 py-3 rounded-2xl font-sans text-[15px]
                ${inputBg}
                focus:outline-none focus:ring-2 focus:ring-blue-100 transition
                placeholder:font-normal
              `}
              placeholder="Type your message..."
              value={newMessage}
              onChange={(ev) => setNewMessage(ev.target.value)}
              required
              autoComplete="off"
            />
            <button
              type="submit"
              className={`
                absolute right-3 top-1/2 -translate-y-1/2
                flex items-center justify-center
                w-9 h-9 rounded-full ${sendBtnBg}
                transition
                disabled:opacity-50
              `}
              aria-label="Send"
              disabled={!newMessage.trim()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`w-5 h-5 ${sendIconColor}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.125A59.769 59.769 0 0121.485 12 59.768 59.768 0 013.27 20.875L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default MessageInputForm;
