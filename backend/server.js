import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import router from "./routes/index.js"
import DbConnection from "./config/dbConfig.js"

/* CONFIGURATION */
dotenv.config();

const app = express();
const corsOptions = {
	credentials: true,
	origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "8mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(router);
DbConnection();

/* SERVER PORT */
const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));