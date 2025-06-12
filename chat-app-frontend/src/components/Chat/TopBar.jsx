import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const TopBar = ({
  setSelectedUserId,
  selectedUserId,
  offlinePeople,
  onlinePeople,
}) => {
  const { mode } = useTheme();

  // Theme-based classes
  const bgColor = mode === "dark" ? "bg-gray-900" : "bg-white";
  const textColor = mode === "dark" ? "text-white" : "text-[#1B2559]";
  const subText = mode === "dark" ? "text-gray-400" : "text-[#22C55E]"; // green for online
  const borderColor = mode === "dark" ? "border-gray-800" : "border-[#E9EEF8]";

  // User info
  const user =
    onlinePeople[selectedUserId] ||
    (offlinePeople[selectedUserId]
      ? {
          ...offlinePeople[selectedUserId],
          username: `${offlinePeople[selectedUserId].firstName} ${offlinePeople[selectedUserId].lastName}`,
          isOnline: false,
        }
      : null);

  if (!user) return null;

  return (
    <div
      className={`
        flex items-center min-h-[64px] px-6 border-b ${borderColor} ${bgColor}
        z-10 relative
      `}
    >
      {/* Back button (mobile only) */}
      <button
        onClick={() => setSelectedUserId(null)}
        className="sm:hidden rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        aria-label="Back"
      >
        <svg
          className="w-6 h-6 text-[#2563eb]"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            d="M15 19l-7-7 7-7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {/* User info */}
      <img
        src={user.avatarLink}
        alt={user.username}
        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow mr-3"
      />
      <div className="flex flex-col">
        <span className={`font-bold text-base ${textColor}`}>{user.username}</span>
        <span className={`text-xs ${onlinePeople[selectedUserId] ? "text-[#22C55E]" : "text-gray-400"}`}>
          {onlinePeople[selectedUserId] ? "Online" : "Offline"}
        </span>
      </div>
      {/* Right actions */}
      <div className="ml-auto flex items-center gap-2">
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition" title="Call">
          <svg className="w-5 h-5 text-[#8F9BBA]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .57 2.57 2 2 0 0 1-.45 2.11l-.27.27a16 16 0 0 0 6.29 6.29l.27-.27a2 2 0 0 1 2.11-.45 12.05 12.05 0 0 0 2.57.57A2 2 0 0 1 22 16.92z" />
          </svg>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition" title="Video">
          <svg className="w-5 h-5 text-[#8F9BBA]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M23 7l-7 5 7 5V7z" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition" title="Info">
          <svg className="w-5 h-5 text-[#8F9BBA]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition" title="More">
          <svg className="w-5 h-5 text-[#8F9BBA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="5" cy="12" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="19" cy="12" r="1.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TopBar;
