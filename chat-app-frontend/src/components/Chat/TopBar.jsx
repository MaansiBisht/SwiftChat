import React from 'react';

const TopBar = ({
  setSelectedUserId,
  selectedUserId,
  offlinePeople,
  onlinePeople,
}) => {
  return (
    <div className="absolute right-2 text-white w-full py-5 bg-gray-800 px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer"
          onClick={() => setSelectedUserId(null)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        <div className="flex items-center gap-2">
          {onlinePeople[selectedUserId] ? (
            <>
              <span>{onlinePeople[selectedUserId].username}</span>
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
            </>
          ) : (
            <>
              <span>
                {offlinePeople[selectedUserId]?.firstName}{" "}
                {offlinePeople[selectedUserId]?.lastName}
              </span>
              <span className="w-2 h-2 rounded-full bg-gray-500"></span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
