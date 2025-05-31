import React from "react";
import Avatar from "./Avatar";

const Contact = ({
  userId,
  username,
  selectedUserId,
  setSelectedUserId,
  isOnline,
  avatarLink,
}) => {
  return (
    <li
      onClick={() => {
        setSelectedUserId(userId);
      }}
      className={`flex flex-col sm:flex-row items-center sm:gap-3 gap-1 text-center sm:text-left ${
        selectedUserId === userId ? "bg-primary" : ""
      } capitalize py-2 lg:py-3 px-2 lg:px-5 rounded-[1.3rem] cursor-pointer hover:bg-opacity-30 transition-all`}
    >
      <Avatar
        userId={userId}
        username={username}
        isOnline={isOnline}
        avatarLink={avatarLink}
      />
      <span className="text-xs lg:text-base">{username}</span>
      {isOnline && (
        <span className="sm:ml-auto text-xs rounded-full bg-green-500 px-2 py-0.5 text-white">
          Active
        </span>
      )}
    </li>
  );
};

export default Contact;
