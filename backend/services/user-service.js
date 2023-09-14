import UserModel from "../models/userModel.js";
import CustomeErrorHandler from "./CustomeErrorHandler.js";

class UserService {
	async findUser(filter) {
		try {
			const user = await UserModel.findOne(filter);
			return user;
		} catch (error) {
			return next(CustomeErrorHandler.databaseError(error));
		}
	}
	async createUser(data) {
		try {
			const user = await UserModel.create(data);
			return user;
		} catch (error) {
			return next(CustomeErrorHandler.databaseError(error));
		}
	}
}

export default new UserService();
