import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Chat/Nav";
import { useProfile } from "../context/profileContext";
import SelectAvatar from "./SelectAvatar";

const Profile = () => {
  const { userDetails } = useProfile();
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

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Nav />
      <div className="w-[91%] flex items-center justify-center p-4">
        <div className="max-w-xl w-full mx-auto bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-white">Update Profile</h2>
          {successMessage && (
            <div className="mb-4 p-3 bg-green-600 text-white rounded-lg">
              {successMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6">
              <div className="w-full">
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-gray-300"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  value={formData?.firstName || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-300"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  value={formData?.lastName || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  disabled
                  className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-600 text-gray-400 cursor-not-allowed"
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
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors"
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
