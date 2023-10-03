import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import router from "./routes/index.js";
import DbConnection from "./config/dbConfig.js";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import { ACTIONS } from "./action.js";
import http from "http";
import { Server } from "socket.io";

dotenv.config();
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

/* CONFIGURATION */
app.use(cookieParser());
const corsOptions = {
	credentials: true,
	origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use("/profile_image", express.static("profile_image"));
app.use(express.json({ limit: "8mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(router);

/* ROUTES */
app.use("/api", routes);

/* MONGOOSE CONNECTION */
DbConnection();

/* Custome Middleware */
app.use(errorHandler);

/* SERVER PORT */
const PORT = process.env.APP_PORT || 5000;

const socketUserMap = {};

io.on("connection", (socket) => {
	console.log("New connection", socket.id);
	socket.on(ACTIONS.JOIN, ({ roomId, user }) => {
		socketUserMap[socket.id] = user;
		const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
		clients.forEach((clientId) => {
			io.to(clientId).emit(ACTIONS.ADD_PEER, {
				peerId: socket.id,
				createOffer: false,
				user,
			});
			socket.emit(ACTIONS.ADD_PEER, {
				peerId: clientId,
				createOffer: true,
				user: socketUserMap[clientId],
			});
		});
		socket.join(roomId);
	});

	socket.on(ACTIONS.RELAY_ICE, ({ peerId, icecandidate }) => {
		io.to(peerId).emit(ACTIONS.ICE_CANDIDATE, {
			peerId: socket.id,
			icecandidate,
		});
	});

	socket.on(ACTIONS.RELAY_SDP, ({ peerId, sessionDescription }) => {
		io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
			peerId: socket.id,
			sessionDescription,
		});
	});

	socket.on(ACTIONS.MUTE, ({ roomId, userId }) => {
		const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
		clients.forEach((clientId) => {
			io.to(clientId).emit(ACTIONS.MUTE, {
				peerId: socket.id,
				userId,
			});
		});
	});

	socket.on(ACTIONS.UNMUTE, ({ roomId, userId }) => {
		const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
		clients.forEach((clientId) => {
			io.to(clientId).emit(ACTIONS.UNMUTE, {
				peerId: socket.id,
				userId,
			});
		});
	});

	socket.on(ACTIONS.MUTE_INFO, ({ userId, roomId, isMute }) => {
		const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
		clients.forEach((clientId) => {
			if (clientId !== socket.id) {
				console.log("mute info");
				io.to(clientId).emit(ACTIONS.MUTE_INFO, {
					userId,
					isMute,
				});
			}
		});
	});

	const leaveRoom = () => {
		const { rooms } = socket;
		Array.from(rooms).forEach((roomId) => {
			const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
			clients.forEach((clientId) => {
				io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
					peerId: socket.id,
					userId: socketUserMap[socket.id]?.id,
				});

				// socket.emit(ACTIONS.REMOVE_PEER, {
				//     peerId: clientId,
				//     userId: socketUserMap[clientId]?.id,
				// });
			});
			socket.leave(roomId);
		});
		delete socketUserMap[socket.id];
	};

	socket.on(ACTIONS.LEAVE, leaveRoom);

	socket.on("disconnecting", leaveRoom);
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
