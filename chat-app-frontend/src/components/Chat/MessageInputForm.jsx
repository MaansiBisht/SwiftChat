import React from "react";

const MessageInputForm = ({
  selectedUserId,
  newMessage,
  setNewMessage,
  sendMessage,
}) => {
  return (
    <>
      {!!selectedUserId && (
        <form
          onSubmit={sendMessage}
          className="relative m-4 w-[calc(100%-2rem)] max-w-[700px] mx-auto"
        >
          <input
            type="search"
            id="search-dropdown"
            className="w-full px-4 py-3 pr-24 rounded-xl bg-transparent border border-gray-600 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Your Message"
            value={newMessage}
            onChange={(ev) => setNewMessage(ev.target.value)}
            required
          />
          <div className="absolute end-2 top-1/2 transform -translate-y-1/2 flex gap-1">
            <button
              type="submit"
              className="aspect-square h-10 font-medium rounded-lg text-sm px-3 py-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.125A59.769 59.769 0 0121.485 12 59.768 59.768 0 013.27 20.875L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        </form>

      )}
    </>
  );
};

export default MessageInputForm;
