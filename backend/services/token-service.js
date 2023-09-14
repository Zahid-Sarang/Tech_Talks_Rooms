import jwt from "jsonwebtoken";
import refreshTokenModel from "../models/refreshTokenModel.js";
import CustomeErrorHandler from "./CustomeErrorHandler.js";

const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;

class TokenService {
	// generate tokens
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, accessTokenSecret, {
			expiresIn: "10s",
		});

		const refreshToken = jwt.sign(payload, refreshTokenSecret, {
			expiresIn: "1y",
		});
		return { accessToken, refreshToken };
	}

	// store refresh token

	async storeRefreshToken(token, userId) {
		try {
			await refreshTokenModel.create({
				token,
				userId,
			});
		} catch (error) {
            return next(CustomeErrorHandler.databaseError(error));
        }
	}
}

export default new TokenService();
