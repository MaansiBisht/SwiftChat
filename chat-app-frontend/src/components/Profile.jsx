import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Chat/Nav";
import { useProfile } from "../context/profileContext";
import SelectAvatar from "./SelectAvatar";
import { useTheme } from "../context/ThemeContext";

const Profile = () => {
  const { userDetails } = useProfile();
  const { mode } = useTheme();
  const [formData, setFormData] = useState({});
  const [selectedLink, setSelectedLink] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/api/user/profile/update", {
        ...formData,
        avatarLink: selectedLink || userDetails?.avatarLink,
      });
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Update error:", error);
      setSuccessMessage("Error updating profile");
    }
  };

  useEffect(() => {
    setFormData(userDetails);
    setSelectedLink(userDetails?.avatarLink);
  }, [userDetails]);

  // Theme-based colors
  const bgMain = mode === "dark" ? "bg-gray-900" : "bg-[#F6F9FE]";
  const cardBg = mode === "dark" ? "bg-gray-800" : "bg-white";
  const cardText = mode === "dark" ? "text-white" : "text-[#1B2559]";
  const labelText = mode === "dark" ? "text-gray-300" : "text-gray-700";
  const inputBg = mode === "dark" ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-gray-100 border-gray-300 text-[#1B2559] placeholder-gray-400";
  const disabledInputBg = mode === "dark" ? "bg-gray-600 border-gray-600 text-gray-400" : "bg-gray-200 border-gray-200 text-gray-400";
  const buttonBg = mode === "dark" ? "bg-blue-700 hover:bg-blue-800 focus:ring-blue-900" : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-800";
  const successBg = "bg-green-600 text-white";

  return (
    <div className={`flex min-h-screen ${bgMain} font-sans`}>
      <Nav />
      <div className="flex-1 flex items-center justify-center mt-4 p-1 sm:p-2">
        <div className={`w-full max-w-lg mx-auto ${cardBg} rounded-xl p-4 sm:p-6 shadow-lg ${cardText}`}>
          <h2 className="mb-6 text-sm font-bold">Update Profile</h2>
          {successMessage && (
            <div className={`mb-4 p-3 rounded-lg ${successBg}`}>
              {successMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6">
              <div className="w-full">
                <label
                  htmlFor="firstName"
                  className={`block mb-2 text-xs font-medium ${labelText}`}
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className={`border text-xs rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 ${inputBg}`}
                  value={formData?.firstName || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="lastName"
                  className={`block mb-2 text-xs font-medium ${labelText}`}
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className={`border text-xs rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 ${inputBg}`}
                  value={formData?.lastName || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className={`block mb-2 text-xs font-medium ${labelText}`}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  disabled
                  className={`border text-xs rounded-lg block w-full p-2.5 cursor-not-allowed ${disabledInputBg}`}
                  value={userDetails?.email || ""}
                />
              </div>
            </div>

            <SelectAvatar
              setSelectedLink={setSelectedLink}
              selectedLink={selectedLink}
            />

            <div className="flex items-center space-x-4 mt-6">
              <button
                type="submit"
                className={`text-white font-medium rounded-lg text-xs px-5 py-2.5 text-center transition-colors focus:outline-none focus:ring-4 ${buttonBg}`}
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
