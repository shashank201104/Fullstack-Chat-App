import { create } from "zustand";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
const BASE_URL = import.meta.env.MODE==="development"?"http://localhost:3000":"/";
export const UseAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.error(
        "Error in useAuthStore:",
        error.response?.data || error.message
      );
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  SignUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/Signup", data);
      set({ authUser: res.data });
      toast.success("Signed up successfully");
      get().connectSocket();
    } catch (error) {
      console.log(error.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  Login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  LogOut: async () => {
    try {
      await axiosInstance.post("/auth/Logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      alert(error.response.data.message);
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: async () => {
    if (!get().authUser || get().socket?.connected) {
      return;
    }
    const socket = io(BASE_URL,{
      query:{
        userId: get().authUser._id
      }
    });
    socket.connect();
    set({ socket });
    socket.on("getOnlineUsers", (data) => {
      set({ onlineUsers: data });
    });
  },
  disconnectSocket: async () => {
    if (get().socket) {
      get().socket.disconnect();
      socket.on("getOnlineUsers", (data) => {
        set({ onlineUsers: data });
      });
      set({ socket: null });
    }
  },    
}));
