import userService from "../services/user-service.js";
import CustomeErrorHandler from "../services/CustomeErrorHandler.js";
import Jimp from "jimp";
import UserDto from "../dtos/user-dtos.js";

const activateController = {
	async activate(req, res, next) {
		const { name, avatar } = re.body;
		if (!name || !avatar) {
			CustomeErrorHandler.excutionFailed(" Phone number is required");
		}

		// Convert the image base64 to buffer
		const buffer = Buffer.from(
			avatar.replace(/^data:image\/(png|jpe?g|gif);base64,/, ""),
			"base64"
		);
		const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;

		// resize the image
		try {
			const jimResp = await Jimp.read(buffer);
			jimResp
				.resize(150, Jimp.AUTO)
				.write(path.resolve(__dirname, `../profile_image/${imagePath}`));
		} catch (err) {
			return next(
				CustomeErrorHandler.databaseError("Could not process the image")
			);
		}
		// update the user profile
		const userId = req.user._id;
		try {
			const user = await userService.findUser({ _id: userId });
			if (!user) {
				return next(CustomeErrorHandler.notFound("User not found"));
			}
			user.activated = true;
			user.name = name;
			user.avatar = `/profile_image/${imagePath}`;
			user.save();
			res.json({ user: new UserDto(user), auth: true });
		} catch (error) {
			return next(CustomeErrorHandler.databaseError(error.message));
		}
	},
};

export default activateController;
