import CustomeErrorHandler from "../services/CustomeErrorHandler.js";
import hashService from "../services/hash-service.js";
import otpservice from "../services/otp-service.js";

const authController = {
	async sendOtp(req, res, next) {
		const { phone } = req.body;
		if (!phone) {
			return next(
				CustomeErrorHandler.phoneRequired("please enter a phone number")
			);
		}

		// generate OTP
		const otp = await otpservice.generateOtp();

		const ttl = 1000 * 60 * 2; // 2 minutes
		const expires = Date.now() + ttl;
		const data = `${phone}.${otp}.${expires}`;
		const hash = hashService.hashOtp(data);

		// send OTP
		try {
			// await otpservice.sendBySms(phone, otp);
			res.json({
				message: "sucessfully sent",
				hash: `${hash}.${expires}`,
				phone,
				otp,
			});
		} catch (error) {
			console.log(error);
			return next(CustomeErrorHandler.messageFailed("message sending failed"));
		}
	},
};

export default authController;
