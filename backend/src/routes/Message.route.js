import express from "express"
import { secureRoute } from "../middleware/auth.middleware.js";
import { GetMessages, GetUserSidebar, SendMessage } from "../controllers/message.controller.js";
const router= express.Router();

router.get("/user",secureRoute,GetUserSidebar)
router.get("/:id",secureRoute,GetMessages)
router.post('/send/:id',secureRoute,SendMessage)

export default router