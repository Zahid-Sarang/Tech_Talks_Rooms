import jwt from "jsonwebtoken";
import refreshTokenModel from "../models/refreshTokenModel.js";
import CustomeErrorHandler from "./CustomeErrorHandler.js";

const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;

class TokenService {
	// generate tokens
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, accessTokenSecret, {
			expiresIn: "1s",
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
			console.error(error.message)
		}
	}

	// Verify access token
	async verifyAccessToken(token) {
		return jwt.verify(token, accessTokenSecret);
	}

	// Verify refresh token
	async verifyRefreshToken(refreshToken) {
		return jwt.verify(refreshToken, refreshTokenSecret);
	}

	// Find refresh token
	async findRefreshToken(userId, refreshToken) {
		return await refreshTokenModel.findOne({
			userId: userId,
			token: refreshToken,
		});
	}

	// Update refresh token
	async updateRefreshToken(userId, refreshToken) {
		return await refreshTokenModel.updateOne(
			{ userId: userId },
			{ token: refreshToken }
		);
	}
	// Remove regresh Token
	async removeToken(refreshToken) {
		return await refreshTokenModel.deleteOne({ token: refreshToken });
	}
}

export default new TokenService();
