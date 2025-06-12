import React, { useState } from "react";
import Avatar from "./Avatar";
import { useTheme } from "../../context/ThemeContext";

const OnlineUsersList = ({
  onlinePeople,
  offlinePeople,
  selectedUserId,
  setSelectedUserId,
  lastMessages = {}, // { [userId]: { preview, timestamp, unreadCount } }
}) => {
  const { mode } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");

  // Theme-based classes
  const sidebarBg = mode === "dark" ? "bg-gray-900" : "bg-white";
  const borderColor = mode === "dark" ? "border-gray-800" : "border-[#E9EEF8]";
  const topBarBg = mode === "dark" ? "bg-gray-900" : "bg-white";
  const inputBg = mode === "dark" ? "bg-gray-800" : "bg-white";
  const inputText = mode === "dark"
    ? "text-gray-200 placeholder:text-gray-400"
    : "text-gray-600 placeholder:text-gray-400";
  const sectionText = mode === "dark" ? "text-gray-200" : "text-[#1B2559]";
  const selectedBg = mode === "dark" ? "bg-gray-800 text-white" : "bg-blue-50 text-blue-900 border border-blue-200";
  const unselectedBg = mode === "dark" ? "bg-gray-900 text-gray-200" : "bg-white text-[#1B2559]";
  const hoverBg = mode === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100";

  const filteredOnlinePeople = Object.keys(onlinePeople).filter((userId) => {
    const username = onlinePeople[userId].username || "";
    return username.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredOfflinePeople = Object.keys(offlinePeople).filter((userId) => {
    const { firstName, lastName } = offlinePeople[userId];
    const fullName = `${firstName} ${lastName}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <aside
      className={`
        w-full sm:w-[340px] sm:max-w-[340px] h-[92vh]
        flex flex-col shadow-xl overflow-hidden
        ${sidebarBg} ${borderColor} border-r
      `}
      style={{ borderRightWidth: 1 }}
    >
      {/* Top Bar */}
      <div className={`flex items-center justify-between px-6 py-5 border-b ${borderColor} ${topBarBg}`}>
        <span className={`font-extrabold text-lg ${sectionText} tracking-tight`}>All messages</span>
        <div className="flex items-center gap-2">
          {/* Theme Toggle Switch */}
          {/* <label className="flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only" checked={mode === "dark"} readOnly />
            <div className={`w-10 h-6 flex items-center bg-gray-200 rounded-full px-1 ${mode === "dark" ? "bg-gray-700" : ""}`}>
              <span className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${mode === "dark" ? "translate-x-4" : ""}`}></span>
            </div>
            <span className="ml-2 text-yellow-400 text-xl">☀️</span>
          </label> */}
          {/* Add Button */}
          <button className="ml-2 p-2 rounded-full hover:bg-gray-100 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M12 6v12m6-6H6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {/* Settings Button */}
          <button className="ml-2 p-2 rounded-full hover:bg-gray-100 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 8.6 15a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 15 8.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 15z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 pt-5 pb-2">
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${inputBg} ${borderColor} shadow-sm`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-5 h-5 ${inputText}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full border-none outline-none bg-transparent text-base ${inputText}`}
          />
        </div>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {[...filteredOnlinePeople, ...filteredOfflinePeople].map((userId, index) => {
          const isOnline = onlinePeople[userId] !== undefined;
          const user = isOnline ? onlinePeople[userId] : offlinePeople[userId];
          const username = isOnline
            ? user.username
            : `${user.firstName} ${user.lastName}`;
          const isSelected = selectedUserId === userId;
          const messageInfo = lastMessages[userId] || {};
          return (
            <button
              key={index}
              onClick={() => setSelectedUserId(userId)}
              className={`
                w-full flex items-center gap-3 py-3 px-3 mb-2 rounded-2xl transition-all duration-200
                ${isSelected ? selectedBg + " shadow" : unselectedBg + " " + hoverBg}
                focus:outline-none focus:ring-0 active:outline-none hover:outline-none
              `}
              style={{
                fontSize: "15px",
              }}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={user.avatarLink}
                  alt={username}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                />
                {/* Status Dot */}
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                    ${isOnline ? "bg-green-500" : "bg-gray-400"}
                  `}
                  title={isOnline ? "Active" : "Inactive"}
                  aria-label={isOnline ? "Active" : "Inactive"}
                ></span>
              </div>
              {/* Main Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span
                    className={`truncate font-semibold ${isSelected
                        ? mode === "dark"
                          ? "text-white"
                          : "text-[#1B2559]"
                        : mode === "dark"
                          ? "text-gray-200"
                          : "text-[#1B2559]"
                      }`}
                  >
                    {username}
                  </span>
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {messageInfo.timestamp || ""}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500 truncate">
                    {messageInfo.preview || "No messages yet"}
                  </span>
                  {messageInfo.unreadCount > 0 && (
                    <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 ml-2 min-w-[20px] text-center font-semibold">
                      {messageInfo.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default OnlineUsersList;
