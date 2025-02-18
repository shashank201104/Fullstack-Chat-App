import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/Cloudinary.js";
import { getRecieverSocketId,io } from "../lib/Socket.js";
export const GetUserSidebar = async (req, res) => {
  try {
    const loggedUserId = req.user._id;
    const Users = await User.find({ _id: { $ne: loggedUserId } }).select(
      "-password"
    );
    res.status(200).json(Users);
  } catch (error) {
    console.log("error in GetUserSidebar controller : " + error.message);
    res.send(400).json({ message: "Internal Server Error" });
  }
};
export const GetMessages = async (req, res) => {
  try {
    const { id: UsertoChatId } = req.params; 
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: UsertoChatId },
        { senderId: UsertoChatId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("error in GetMessage controller : " + error.message);
    res.status(400).json({ message: "Internal Server Error" });
  }
};
export const SendMessage = async (req, res) => {
  try {
    const { txtMsg, image } = req.body;
    const { id: UsertoChatID } = req.params;
    const myId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderId: myId,
      receiverId: UsertoChatID,
      text: txtMsg,
      image: imageUrl,
    });
    await newMessage.save();

    const RecieverSocketId=getRecieverSocketId(UsertoChatID);
    if(RecieverSocketId){
      io.to(RecieverSocketId).emit("newMessage",newMessage)
    }

    res.status(200).json(newMessage);
  } catch (error) {
    console.log("error in SendMessage controller : " + error.message);
    res.status(400).json({ message: "Internal Server Error" });
  }
};
