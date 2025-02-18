import "./App.css";
import {Navigate, RouterProvider, createBrowserRouter,Outlet } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Homepage from "./pages/Homepage.jsx";
import { UseAuthStore } from "./store/UseAuthStore.js";
import { useEffect, useState } from "react";
import ThemeContext from "./Context/ThemeContext.js";
function App() {
  const { authUser, checkAuth, isCheckingAuth ,onlineUsers } = UseAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  const ProtectedRoute= ({authUser}) => {
    return authUser ? <Outlet /> : <Navigate to="/Login" />;
  }
  
  const [theme, setTheme] = useState("light")
  
  const router = createBrowserRouter([
    {
      path: "/",
      element:<ProtectedRoute authUser={authUser}/>,
      children:[
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path:"/Profile",
          element: <ProfilePage />,
        }
      ]
    },
    {
      path: "/Signup",
      element:authUser?<Navigate to="/" />:<Signup />,
    },
    {
      path: "/Login",
      element:authUser?<Navigate to="/" />: <Login />,
    },
    {
      path: "/Profile",
      element: authUser ? <ProfilePage /> : <Navigate to="/Login" />,
    },
    
  ]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
    )
  }

  return ( 
      <ThemeContext.Provider value={{theme,setTheme}}>
      <RouterProvider router={router} />      
      </ThemeContext.Provider>
  
  );
  
}

export default App;
