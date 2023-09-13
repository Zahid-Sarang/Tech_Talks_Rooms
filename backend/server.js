import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import router from "./routes/index.js";
import DbConnection from "./config/dbConfig.js";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();
const app = express();

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
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
