import React,{useEffect} from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { UseAuthStore } from '../store/UseAuthStore'
import Sidebar from '../components/Sidebar'
import { UseChatStore } from '../store/UseChatStore'
import NochatSelected from '../components/NochatSelected'
import ChatContainer from '../components/ChatContainer'
const Homepage = () => {
  const { authUser } = UseAuthStore()
  const {selectedUser}=UseChatStore()
  const navigate = useNavigate()
  useEffect(() => {
    if (!authUser) {
      navigate('/Login')
    }
  }, [authUser])


  return (
    <div>
      <Navbar/>
      <div className='flex h-[calc(100vh-58px)] gap-2 pr-2 mt-1 '>
      <Sidebar/>
      {selectedUser?<ChatContainer/>:<NochatSelected/>}
      </div>

    </div>
  )
}

export default Homepage