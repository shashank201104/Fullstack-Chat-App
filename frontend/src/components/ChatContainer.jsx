import React, { useContext, useEffect, useRef } from "react";
import { UseChatStore } from "../store/UseChatStore";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageSkeleton from "./Skeletons/MessagesSkel";
import { UseAuthStore } from "../store/UseAuthStore";
import ThemeContext from "../Context/ThemeContext";

const ChatContainer = () => {
  const {
    selectedUser,
    setSelectedUser,
    messages,
    getMessages,
    isMessageLoading,
    subscribeToNewMessage,
    unsubscribeFromNewMessages,
  } = UseChatStore();

  const { authUser } = UseAuthStore();
  const {theme}=useContext(ThemeContext)
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && messages.length > 0){
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (selectedUser && selectedUser._id) {
      getMessages(selectedUser._id);
      subscribeToNewMessage();
    }
    return () => unsubscribeFromNewMessages();
  }, [
    selectedUser._id,
    selectedUser,
    getMessages,
    subscribeToNewMessage,
    unsubscribeFromNewMessages,
  ]);

  useEffect(() => {
    if (!authUser) {
      setSelectedUser(null);
    }
  }, [authUser]);

  if (isMessageLoading || !selectedUser || !authUser) {
    return (
      <div className="w-5/6 h-full flex flex-col overflow-y-auto">
        <ChatHeader />
        <MessageSkeleton/>
        <ChatInput />
      </div>
    );
  }

  return (
    <div className="w-5/6 h-full flex flex-col  rounded" >
      <ChatHeader />
      <div
        ref={ref}
        className={`flex flex-col flex-grow overflow-y-auto p-4 space-y-4 
          scrollbar font-bold text-white backdrop-blur-xs `}
      > 
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex items-end gap-2 ${
              message.senderId === authUser._id
                ? "justify-end"
                : "justify-start"
            }`}
          >
            {message.senderId !== authUser._id && (
              <div className="w-9 h-9 rounded-full border overflow-hidden">
                <img
                  src={selectedUser.profilePic || "DefaultProfilePic.jpg"}
                  alt="profile pic"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <time
                className={`block text-xs opacity-70 mt-1  mb-1 ${
                  message.senderId === authUser._id ? "text-right" : "text-left"
                }`}
              >
                {new Date(message.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
              {message.image && (
                <img
                  src={message.image}
                  alt="image"
                  className="w-40 h-40 object-cover rounded-lg mb-1"
                />
              )}
              {message.text && message.text.trim() !== "" && (
                <div
                  className={`relative max-w-xs px-4 py-3 text-m rounded-2xl shadow-md ${
                    message.senderId === authUser._id
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-[#2b2929] text-white rounded-bl-none"
                  }`}
                >
                  <p>{message.text}</p>
                </div>
              )}
            </div>
            {message.senderId === authUser._id && (
              <div className="w-9 h-9 rounded-full border overflow-hidden">
                <img
                  src={authUser.profilePic || "DefaultProfilePic.jpg"}
                  alt="profile pic"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <ChatInput />
    </div>
  );
};

export default ChatContainer;
