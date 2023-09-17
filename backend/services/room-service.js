import RoomModel from "../models/room-model.js";

import CustomeErrorHandler from "./CustomeErrorHandler.js";

class RoomService {
	async createRoom(payload) {
		const { topic, roomType, ownerId } = payload;
		try {
			const room = await RoomModel.create({
				topic,
				roomType,
				ownerId,
				speakers: [ownerId],
			});
			return room;
		} catch (error) {
			throw error;
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
			console.error(error.message);
		}
	}

	async getRoom(roomId) {
		try {
			const room = await RoomModel.findOne({ _id: roomId });
			return room;
		} catch (error) {
			console.error(error.message);
		}
	}
}

export default new RoomService();
