import express from "express";
import authController from "../controller/auth-controller.js";
import activateController from "../controller/activate-controller.js";
import roomsController from "../controller/rooms-controller.js";
import  authMiddleware  from "../middlewares/authMiddleware.js";
const router = express.Router();

/*
|--------------------------------------------|
| Authentication Routes       
|--------------------------------------------|
| All the routes for authentication are defined  
| here like send-otp, verify-otp , activate , 
| refresh-Token, logout
|
*/

router.post("/send-otp", authController.sendOtp);
router.post("/verify-otp", authController.verifyOtp);
router.get("/refresh-Token", authController.refreshToken);
router.post("/api/activate", authMiddleware, activateController.activate);
router.post ("/logout", authMiddleware, authController.logout);
router.post("/api/rooms", authMiddleware, roomsController.createRoom);
router.get("/api/allrooms", authMiddleware, roomsController.allRooms);
router.get('/api/rooms/:roomId', authMiddleware, roomsController.show);
export default router;
