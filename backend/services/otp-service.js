import dotenv from "dotenv";
import crypto from "crypto";

import hashService from "./hash-service.js";

import twilioLib from "twilio";
dotenv.config();
const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const twilio = twilioLib(smsSid, smsAuthToken, {
	lazyLoading: true,
});

class Otpservice {
	/* GENERATE OTP */
	async generateOtp() {
		const otp = crypto.randomInt(1000, 9999);
		return otp;
	}
	/* SEND SMS */
	async sendBysms(phone, otp) {
		try {
			return await twilio.messages.create({
				to: phone,
				from: process.env.SMS_FROM_NUMBER,
				body: `Your TechTalkRooms Otp is ${otp}`,
			});
		} catch (error) {
			console.error("Error sending SMS:", error.message);
			throw error;
		}
	}

	/* VERIFY OTP */
	verifyOtp(hashedOtp, data) {
		let computedHash = hashService.hashOtp(data);
		return computedHash === hashedOtp;
	}
}

export default new Otpservice();
