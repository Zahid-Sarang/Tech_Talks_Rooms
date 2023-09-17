import UserModel from "../models/userModel.js";


class UserService {
	async findUser(filter) {
		try {
			const user = await UserModel.findOne(filter);
			return user;
		} catch (error) {
			console.error(error.message);
		}
	}
	async createUser(data) {
		try {
			const user = await UserModel.create(data);
			return user;
		} catch (error) {
			console.error(error.message);
		}
	}
}

export default new UserService();
