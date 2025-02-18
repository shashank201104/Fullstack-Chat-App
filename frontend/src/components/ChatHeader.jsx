import React, { useContext } from 'react'
import { UseChatStore } from '../store/UseChatStore'
import { X } from 'lucide-react'
import ThemeContext from '../Context/ThemeContext'
const ChatHeader = () => {
  const {theme}=useContext(ThemeContext)
    const {selectedUser,setSelectedUser}=UseChatStore()
  return (
    <div className={`flex justify-between items-center ${theme === "light" ? "bg-[#201029] " : " bg-[#0b010ee0] "}  text-white px-4  sticky top-0 z-10 w-full rounded-t-md gap-2`}>
        <div className='flex items-center gap-2 my-2'>
            <img src={selectedUser.profilePic || "DefaultProfilePic.jpg"} alt="" className='h-10 w-10 object-cover object-center mx-2 rounded-4xl ' />
            <span className='text-xl overflow-hidden whitespace-nowrap text-ellipsis'>{selectedUser.fullName}</span>
        </div>
        <X onClick={()=>{setSelectedUser(null)}} className='cursor-pointer w-8'></X>
    </div>
  )
}

export default ChatHeader