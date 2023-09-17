import RoomModel from "../models/room-model.js";

import CustomeErrorHandler from "./CustomeErrorHandler.js";

class RoomService {
	async createRoom(payload) {
		const { topic, roomtype, ownerId } = payload;
		try {
			const room = await RoomModel.create({
				topic,
				roomtype,
				ownerId,
				speakers: [ownerId],
			});
			return room;
		} catch (error) {
			return next(CustomeErrorHandler.databaseError(error.message));
		}
	}
	async getAllRooms(types) {
		try {
			const rooms = await RoomModel.find({ roomType: { $in: types } })
				.populate("speakers")
				.populate("ownerId")
				.exec();
			return rooms;
		} catch (error) {
			return next(CustomeErrorHandler.databaseError(error.message));
		}
	}

	async getRoom(roomId) {
		try {
			const room = await RoomModel.findOne({ _id: roomId });
			return room;
		} catch (error) {
			return next(CustomeErrorHandler.databaseError(error.message));
		}
	}
}

export default new RoomService();
