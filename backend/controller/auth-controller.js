import CustomeErrorHandler from "../services/CustomeErrorHandler.js";
import hashService from "../services/hash-service.js";
import otpservice from "../services/otp-service.js";
import tokenService from "../services/token-service.js";
import userService from "../services/user-service.js";
import UserDto from "../dtos/user-dtos.js";

const authController = {
	/* SEND OTP */
	async sendOtp(req, res, next) {
		const { phone } = req.body;
		if (!phone) {
			return next(
				CustomeErrorHandler.excutionFailed(" Phone number is required")
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
			// await otpservice.sendBysms(phone, otp);
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

	/* VERIFY OTP */
	async verifyOtp(req, res, next) {
		const { phone, otp, hash } = req.body;

		if (!otp || !hash || !phone) {
			return next(
				CustomeErrorHandler.excutionFailed(" All fields are required!")
			);
		}

		// Split the time from the hashed String
		const [hashedOtp, expires] = hash.split(".");
		if (Date.now() > +expires) {
			return next(CustomeErrorHandler.excutionFailed(" OTP Expired !"));
		}

		// VERIFY THAT OTP
		const data = `${phone}.${otp}.${expires}`;
		const isValid = otpservice.verifyOtp(hashedOtp, data);
		if (!isValid) {
			return next(CustomeErrorHandler.excutionFailed("Invalid OTP"));
		}

		// store users informations
		let user;
		try {
			user = await userService.findUser({ phone });
			if (!user) {
				user = await userService.createUser({ phone });
			}
		} catch (error) {
			console.log(error);
			return next(CustomeErrorHandler.databaseError(error));
		}

		// generate access token
		const { accessToken, refreshToken } = tokenService.generateTokens({
			_id: user._id,
			activated: false,
		});

		// store the refresh token
		await tokenService.storeRefreshToken(refreshToken, user._id);

		// pass http only cookies
		res.cookie("accessToken", accessToken, {
			maxAge: 1000 * 60 * 60 * 24 * 30,
			httpOnly: true,
		});
		res.cookie("refreshToken", refreshToken, {
			maxAge: 1000 * 60 * 60 * 24 * 30,
			httpOnly: true,
		});
		const userDto = new UserDto(user);

		res.json({ user: userDto, auth: true });
	},
};

export default authController;
