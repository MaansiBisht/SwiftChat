import React from "react";
import { useTheme } from "../../context/ThemeContext";

const MessagesHeader = ({
  user = {
    name: "Ammi Watts",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    subtitle: "My settings",
  },
  runningProjects = 6,
  notifications = 6,
  onSearch,
}) => {
  const { mode } = useTheme();

  // Theme-based classes
  const bgColor = mode === "dark" ? "bg-gray-900" : "bg-white";
  const textColor = mode === "dark" ? "text-white" : "text-[#1B2559]";
  const subTextColor = "text-gray-400";
  const blueColor = "text-[#2563eb]";
  const inputBg = mode === "dark" ? "bg-gray-800" : "bg-white";
  const inputText = mode === "dark" ? "text-gray-200" : "text-[#B1B5C3]";
  const borderColor = mode === "dark" ? "border-gray-800" : "border-[#E9EEF8]";

  return (
    <header
      className={`flex items-center justify-between w-full px-4 sm:px-7 py-2 border-b ${borderColor} ${bgColor} font-sans`}
      style={{
        fontFamily: "'Inter', Arial, sans-serif",
        minHeight: "56px",
      }}
    >
      {/* Left: Title and Projects */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className={`text-lg font-bold tracking-tight select-none leading-[32px] ${textColor}`}>
          Messages
        </span>
        <span className={`ml-2 text-xs font-semibold ${blueColor} select-none`}>
          {runningProjects}
        </span>
        <span className="text-xs font-normal select-none text-gray-400">
          Running Projects
        </span>
      </div>

      {/* Center: Search (hidden on mobile) */}
      <form
        className={`hidden md:flex items-center rounded-xl border ${borderColor} ${inputBg} px-3 h-9 w-full max-w-[260px] mx-4`}
        onSubmit={e => {
          e.preventDefault();
          if (onSearch) onSearch(e.target.elements.search.value);
        }}
      >
        <input
          type="text"
          name="search"
          placeholder="Search"
          className={`flex-1 bg-transparent outline-none text-sm ${inputText} placeholder:${inputText}`}
        />
        <button
          type="submit"
          className="ml-2 flex items-center justify-center w-7 h-7 bg-[#2563eb] rounded-lg"
        >
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
          </svg>
        </button>
      </form>

      {/* Right: Actions and User */}
      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        {/* Add Button (hidden on mobile) */}
        <button className="hidden md:flex items-center justify-center w-8 h-8 bg-[#2563eb] rounded-xl">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M12 6v12M6 12h12" strokeLinecap="round" />
          </svg>
        </button>
        {/* Notification */}
        <div className="relative flex items-center justify-center w-8 h-8">
          <svg
            className={`w-5 h-5 ${textColor}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="absolute -top-1 -right-1 bg-[#FF4B55] text-white text-[10px] font-bold rounded-full px-1 py-0.5 leading-tight">
            {notifications}
          </span>
        </div>
        {/* User */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex flex-col items-end">
            <span className={`font-semibold text-[13px] leading-[16px] ${textColor}`}>
              {user.name}
            </span>
            <span className={`text-xs leading-[14px] ${subTextColor}`}>
              {user.subtitle}
            </span>
          </div>
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover ml-2"
          />
        </div>
      </div>
    </header>
  );
};

export default MessagesHeader;