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

//socket

const socketUserMapping = {};

io.on("connection", (socket) => {
	console.log("new connection", socket.id);
	socket.on(ACTIONS.JOIN, ({ roomId, user }) => {
	    socketUserMapping[socket.id] = user;
	    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
	    clients.forEach((clientId) => {
	        io.to(clientId).emit(ACTIONS.ADD_PEER, {});
	    });
	    socket.emit(ACTIONS.ADD_PEER, {});
	    socket.join(roomId);
	    console.log(clients);
	});
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
