import CustomeErrorHandler from "../services/CustomeErrorHandler.js";

const authController = {
	async sendOtp(req, res, next) {
		const { phone } = req.body;
		if (!phone) {
			// return res.status(400).json({ message: "All fields are required!" });
			return next(
				CustomeErrorHandler.phoneRequired("please enter a phone number")
			);
		}
		res.json({ message: "sucessfully sent", phone });
	},
};

export default authController;
