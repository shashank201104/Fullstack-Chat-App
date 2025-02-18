import { UseAuthStore } from "../store/UseAuthStore";
import { Link } from "react-router-dom";
import { User, LogOutIcon } from "lucide-react";
import { useContext, useState } from "react";
import { Sun,Moon } from "lucide-react";
import ThemeContext from "../Context/ThemeContext";
const Navbar = () => {

  const { LogOut, authUser } = UseAuthStore();

  const {theme,setTheme}=useContext(ThemeContext)

  const handleThemeChange=()=>{
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));

  }

  return (
    <nav className={`flex ${theme === "light" ? "bg-[#4131477d] " : "bg-[#0b010ea8] "} items-center text-white justify-between px-4 py-1`}>
      <div className="flex items-center gap-3 font-bold ">
        <Link to="/">
          <img src="/ChatConnectLogo.png" className="w-15" alt="" />
        </Link>
        <Link to="/" className="hidden sm:block">
          Chat-Connect
        </Link>
      </div>
      <ul className="flex items-center gap-8">
        <li>
          <button
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-all duration-300"
            onClick={handleThemeChange}
          >
            {theme === "light" ? (
              <Moon className="w-6 h-6 text-gray-300" />
            ) : (
              <Sun className="w-6 h-6 text-yellow-500" />
            )}
          </button>
        </li>
        <li>
          <Link to="/Profile" className="flex gap-2 items-center">
            Profile
            <User size={20} />
          </Link>
        </li>
        <li>
          <span
            onClick={LogOut}
            className="cursor-pointer flex gap-2 items-center"
          >
            Logout
            <LogOutIcon size={20} />
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
