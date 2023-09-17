import roomServervice from "../services/room-servervice.js";
import CustomeErrorHandler from "../services/CustomeErrorHandler.js";
const roomsController = {
	async createRoom(req, res, next) {
		const { topic, roomType } = req.body;

		if (!topic || !roomType) {
			CustomeErrorHandler.excutionFailed(
				"please provide a topic and room type"
			);
		}

		const room = await roomServervice.createRoom({
			topic,
			roomType,
			ownerId: req.user._id,
		});
		return res.json(new RoomDto(room));
	},
	async allRooms(req, res, next) {
		const rooms = await roomServervice.getAllRooms(["open"]);
		const allRooms = await rooms.map((room) => new RoomDto(room));
        return res,json(allRooms);
	},
    async show(req, res) {
		const room = await roomService.getRoom(req.params.roomId);

		return res.json(room);
	}
};

export default roomsController;
