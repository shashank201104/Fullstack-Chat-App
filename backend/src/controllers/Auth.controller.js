import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { GenrateToken } from "../lib/Utils.js";
import cloudinary from "../lib/Cloudinary.js";

export const Signuptauth = async (req, res) => {

    let { fullName, email, password } = req.body;

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password should contain at least 8 characters" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let newUser = new User({
            email,     
            fullName: fullName.trim(), 
            password: hashedPassword,
            profilePic: "",  
        });

        await newUser.save();

        GenrateToken(newUser._id, res);

        return res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
        });

    } catch (error) {
        console.error("Error in signup controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const Loginauth = async (req, res) => {
    const { email, password } = req.body;
    try {  
        if (!email || !password) {
            return res.status(400).json({ message: "Fields cannot be empty" });
        }

        const currUser = await User.findOne({ email });
        if (!currUser) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const passwordCheck = await bcrypt.compare(password, currUser.password);
        if (!passwordCheck) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        GenrateToken(currUser._id, res);
        return res.status(200).json({
            _id: currUser._id,
            fullName: currUser.fullName,
            email: currUser.email,
            profilePic: currUser.profilePic
        });
    } catch (error) {
        console.log("Error in login controller: " + error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const Logoutauth=(req,res)=>{
    try {   
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"logout successfully"})
    } catch (error) {
        console.log("error in logout controller : "+ error.message) 
        return res.status(500).json({ message: "Internal Server Error" });

    }
}


export const updateProfile = async (req, res) => {
    try {
      const { profilePic } = req.body;
      const userId = req.user._id;
  
      if (!profilePic) {
        return res.status(400).json({ message: "Profile pic is required" });
      }
  
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: uploadResponse.secure_url },
        { new: true }
      );
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.log("error in update profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


export const checkAuth = (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        res.status(200).json(req.user);
    } catch (error) {
        console.error("Error in checkAuth:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


