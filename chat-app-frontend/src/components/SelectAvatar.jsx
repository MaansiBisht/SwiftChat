import React, { useEffect, useState } from "react";
import axios from "axios";

const SelectAvatar = ({ setSelectedLink, selectedLink }) => {
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await axios.get("/api/avatar/all");
        setAvatars(response.data.avatars);
      } catch (error) {
        console.error("Error fetching avatars:", error);
      }
    };
    fetchAvatars();
  }, []);

  return (
    <div className="mt-3">
      <p className="block mb-4 text-lg font-medium text-white">
        Choose Avatar
      </p>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {avatars?.map((avatar) => (
          <img
            key={avatar._id}
            src={avatar.link}
            onClick={() => setSelectedLink(avatar.link)}
            alt={`Avatar ${avatar._id}`}
            className={`w-20 h-20 rounded-full cursor-pointer p-1 object-cover transition-all ${
              selectedLink === avatar.link
                ? "ring-4 ring-blue-500"
                : "hover:ring-2 hover:ring-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectAvatar;
