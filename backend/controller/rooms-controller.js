import roomService from "../services/room-service.js";
import CustomeErrorHandler from "../services/CustomeErrorHandler.js";
import RoomDto from "../dtos/room-dto.js"
const roomsController = {
	async createRoom(req, res, next) {
		const { topic, roomType } = req.body;

		if (!topic || !roomType) {
			CustomeErrorHandler.excutionFailed(
				"please provide a topic and room type"
			);
		}

		const room = await roomService.createRoom({
			topic,
			roomType,
			ownerId: req.user._id,
		});
		return res.json(new RoomDto(room));
	},
	async allRooms(req, res, next) {
		const rooms = await roomService.getAllRooms(["open"]);
		const allRooms = rooms.map((room) => new RoomDto(room));
        return res.json(allRooms);
	},
    async show(req, res) {
		const room = await roomService.getRoom(req.params.roomId);

		return res.json(room);
	}
};

export default roomsController;
