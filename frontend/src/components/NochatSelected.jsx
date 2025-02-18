import React, { useContext } from 'react';
import { MessageSquare } from 'lucide-react';
import ThemeContext from '../Context/ThemeContext';
const NochatSelected = () => {
  const { theme } = useContext(ThemeContext);

 
  return (
    <div className={`w-full flex flex-1 flex-col items-center justify-center p-0 sm:p-16 bg-base-100/50 backdrop-blur-none backdrop-brightness-100 text-white `}>
      <div className="max-w-md min-w-fit text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce"
            >
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold">Welcome to ChatConnect!</h2>
        <p
          className={`text-base-content/60 text-[#ac8ed7] font-bold text-xl`}
        >
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
}

export default NochatSelected;
