import express from 'express'
import {Loginauth,Signuptauth,Logoutauth,updateProfile,checkAuth} from "../controllers/Auth.controller.js"
import { secureRoute } from '../middleware/auth.middleware.js'
const router=express.Router()

router.post('/login',Loginauth)
router.post('/Signup',Signuptauth)
router.post('/Logout',Logoutauth)
router.put("/update-Profile",secureRoute,updateProfile)
router.get('/check',secureRoute,checkAuth)
export default router