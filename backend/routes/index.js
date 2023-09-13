import express from "express";
import authController from "../controller/auth-controller.js"



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

router.post("/send-otp",authController.sendOtp)

export default router;