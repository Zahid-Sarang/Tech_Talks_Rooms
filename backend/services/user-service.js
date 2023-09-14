import UserModel from "../models/userModel.js";
import CustomeErrorHandler from "./CustomeErrorHandler.js";

class UserService {
	async findUser(filter) {
		try {
			const user = await UserModel.findOne(filter);
			return user;
		} catch (error) {
			return next(CustomeErrorHandler.databaseError(error.message));
		}
	}
	async createUser(data) {
		try {
			const user = await UserModel.create(data);
			return user;
		} catch (error) {
			return next(CustomeErrorHandler.databaseError(error.message));
		}
	}
}

export default new UserService();
