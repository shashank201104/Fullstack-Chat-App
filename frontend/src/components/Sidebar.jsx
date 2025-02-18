import React, { useContext, useEffect, useState } from "react";
import { UseChatStore } from "../store/UseChatStore";
import SidebarSkel from "./Skeletons/SidebarSkel";
import { UseAuthStore } from "../store/UseAuthStore";
import { Users } from "lucide-react";
import ThemeContext from "../Context/ThemeContext";

const Sidebar = () => {
  const { users, isUserLoading, getUsers, selectedUser, setSelectedUser } =
    UseChatStore();
  const [isMobile, setisMobile] = useState(window.innerWidth < 768);
  const { onlineUsers } = UseAuthStore();
  const [showOnline, setshowOnline] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    const handleResize = () => {
      setisMobile(window.innerWidth <= 680);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const filteredUsers = showOnline
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUserLoading) {
    return <SidebarSkel />;
  }

  return (
    <div
      className={`${
        theme === "light" ? "bg-[#4131477d] " : "bg-[#0b010ea8]"
      } w-1/6 text-white box-border md:min-w-fit  md:w-1/5 border-zinc-700 rounded overflow-y-clip`}
    >
      {isMobile ? (
        <Users className="w-6 h-6 mx-auto my-1" />
      ) : (
        <h1
          className={`
           text-center text-2xl  my-2 flex items-center justify-center flex-wrap  w-fit gap-3 m-auto`}
        >
          <Users className="w-6 h-6 mx-2" />
          Contacts
        </h1>
      )}
      {!isMobile && (
        <div>
          <span className={`flex items-center mt-4 px-1 mx-auto sm:pl-1`}>
            <input
              type="checkbox"
              checked={showOnline}
              onChange={() => setshowOnline(!showOnline)}
              className={`appearance-none w-4 h-4 border-2 ${
                theme === "light" ? "border-gray-500" : "border-gray-700"
              } rounded-full mx-2 bg-white box-border checked:bg-green-600  checked:border-gray-700 focus:outline-none transition-all duration-300 cursor-pointer`}
            />
            Show Online
          </span>
        </div>
      )}
      <p
        className={`${
          theme === "light" ? "text-black" : "text-white"
        } text-center text-s md:text-start md:pl-4 text-zinc-500`}
      >
        {onlineUsers.length - 1} online
      </p>

      <ul className="overflow-y-auto h-1/1 scrollbar">
        {filteredUsers?.map((user) => {
          return (
            <button
              key={user._id}
              onClick={() =>
                selectedUser === user
                  ? setSelectedUser(null)
                  : setSelectedUser(user)
              }
              className={`${
                theme === "light"
                  ? "hover:bg-[#ffffff2a]"
                  : "hover:bg-[#000000d3]"
              } w-full px-3 py-2 mb-0.5 flex items-start justify-center md:justify-normal  item-center sm:mx-auto gap-3 transition-colors ${
                selectedUser?._id === user._id ? "bg-[#444444]" : ""
              }`}
            >
              <div className="relative my-auto lg:mx-0 ">
                <img
                  src={user.profilePic || "/DefaultProfilePic.jpg"}
                  alt={user.name}
                  className={`min-w-10 h-10 my-auto object-cover rounded-full ${
                    theme === "light" ? "border border-black" : ""
                  }`}
                />
                {onlineUsers.includes(user._id) && (
                  <span
                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                    rounded-full ring-2 ring-zinc-900"
                  />
                )}
              </div>

              {/* User info - only visible on larger screens */}
              <div className="text-left min-w-0 hidden md:block">
                <div className="text-xl truncate">{user.fullName}</div>
                <div
                  className={`text-sm ${
                    theme === "light"
                      ? onlineUsers.includes(user._id)
                        ? "text-green-600 font-bold"
                        : "text-gray-200"
                      : onlineUsers.includes(user._id)
                      ? "text-green-400 font-bold"
                      : "text-gray-200"
                  }`}
                >
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
