import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { UseAuthStore } from "../store/UseAuthStore";
import { Camera } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import ThemeContext from "../Context/ThemeContext";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = UseAuthStore();
  const [image, setImage] = useState(false);
  const navigate = useNavigate();
  const {theme}=useContext(ThemeContext)
  if (authUser == null) {
    return <Navigate to="/Login" />;
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const date = new Date(authUser.createdAt);

  return (
    <div className="backdrop-blur-sm min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center  mt-10">
      <div className={`${theme === "light" ? "bg-[#ffffff1f]" : "bg-[#00000081]"} text-white rounded-2xl w-4/5 sm:w-lg mx-auto p-8 shadow-lg shadow-[#3b3b3b]`}>
          {/* Image Section */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="relative">
              <img
                src={image || authUser.profilePic || "/DefaultProfilePic.jpg"}
                alt="Profile"
                className="w-50 h-50 rounded-full object-cover border-4 border-white transform hover:scale-105 transition-all duration-300"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-2 right-4 bg-blue-500 hover:bg-blue-600 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-6 h-6 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-xs text-gray-400 text-center">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click to update your profile picture"}
            </p>
          </div>

          {/* User Info Section */}
          <div className="flex flex-col items-center text-center">
            <p className="text-3xl font-semibold text-white">{authUser.fullName}</p>
            <p className="text-xl mt-1 text-gray-300">{authUser.email}</p>
            <p className="mt-4 text-m underline text-gray-400">
              Account created on: {date.toDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
