import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import AuthRoute from "./routes/Auth.route.js";
import messageRoute from "./routes/Message.route.js"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import { app, io, server } from "./lib/Socket.js";
import path from "path"
dotenv.config();
const PORT = process.env.PORT;
const __dirname=path.resolve()

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
  })
}

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser())
app.use(cors({
  origin: "*", 
  credentials: true, 
  methods: "GET,POST,PUT,DELETE", 
  allowedHeaders: "Content-Type,Authorization", // 
}));
app.use("/api/auth", AuthRoute);
app.use("/api/message",messageRoute)

app.get("/", (req, res) => {
  res.send("hello");
});
server.listen(PORT, () => {
  console.log(`http://localhost:`+PORT);
  connectDB();
});
