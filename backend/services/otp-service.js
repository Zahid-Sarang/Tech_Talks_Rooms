import crypto from "crypto";
class Otpservice {
	async generateOtp() {
		const otp = crypto.randomInt(1000, 9999);
		return otp;
	}
}

export default new Otpservice();
