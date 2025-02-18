import React,{useState,useRef, useContext} from 'react'
import { Image } from 'lucide-react'
import { UseChatStore } from '../store/UseChatStore'
import { Send, X } from 'lucide-react'
import toast from 'react-hot-toast'
import ThemeContext from '../Context/ThemeContext'
const ChatInput = () => {
    const [text, setText] = useState("")
    const {theme}=useContext(ThemeContext)
    const [isMessageSending, setisMessageSending] = useState(false)
    const [imagePreview, setimagePreview] = useState(null)
    const fileInputRef = useRef(null)
    const{sendMessage}=UseChatStore()

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if(!file.type.startsWith('image')){
            toast.error('Please select an image')
            return
        }
        const reader = new FileReader()
        reader.onload = () => {
            setimagePreview(reader.result)
        }
        reader.readAsDataURL(file)
    }
    const removeImage = () => {
        setimagePreview(null)
        if(fileInputRef.current){
            fileInputRef.current.value = null
        }
    }
    const handleSendMessage = async(e) => {
        e.preventDefault()
        setisMessageSending(true)
        if(!text.trim() && !imagePreview){
            return
        }
        try {
            await sendMessage(
               { txtMsg:text.trim(),
                image:imagePreview,}
            )
            setText('')
            setimagePreview(null)
            if(fileInputRef.current){
                fileInputRef.current.value = null
            }
        } catch (error) {
            console.error(error.response?.data?.message || error.message)
            
        }finally{
            setisMessageSending(false)
        }  
    }
    return (
        <div className={`p-4 w-full  text-white backdrop-blur-2xl  border-t border-zinc-700 shadow-md`}>
          
          {imagePreview && (
            <div className="mb-3 flex items-center gap-3 bg-zinc-800 p-2 rounded-lg shadow-sm">
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-lg border border-zinc-600 shadow-md"
                />
                <button
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md hover:bg-red-600 transition"
                  type="button"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
          )}
      
          
          <form onSubmit={handleSendMessage} className="flex items-center gap-3">
            
            <div className="flex-1">
            <input
  type="text"
  className={`w-full  rounded-lg px-4 py-3 border-2 border-[#ffffff]  focus:border focus:border-green-500 placeholder:text-zinc-500 shadow-sm`}
  placeholder="Type a message..."
  value={text}
  onChange={(e) => setText(e.target.value)}
/>

            </div>
      
          
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
      
            
            <button
              type="button"
              className={`btn btn-circle  text-white hover:bg-emerald-500  transition-all shadow-md bg-clip-text`}
              disabled={imagePreview}
              onClick={() => fileInputRef.current?.click()}
            >
              <Image size={22} />
            </button>
      
         
            <button
  type="submit"
  className={`btn btn-circle ${
    text.trim() || imagePreview
      ? 'bg-emerald-500 hover:bg-emerald-600 text-blue-800 bg-clip-text'
      : 'bg-zinc-700 text-[#24243a] cursor-not-allowed bg-clip-text'
  } shadow-md transition-all`}
  disabled={isMessageSending}
>
  <Send size={22} />
</button>

          </form>
        </div>
      );
      
}

export default ChatInput