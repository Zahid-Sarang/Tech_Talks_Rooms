import CustomeErrorHandler from "../services/CustomeErrorHandler.js";
import tokenService from "../services/token-service.js";

const authMiddleware = async function (req, res, next) {
	try {
		const { accessToken } = req.cookies;
		console.log(accessToken);
		if (!accessToken) {
			return next(CustomeErrorHandler.isunAuthorized("Access token required"));
		}
		const userData = await tokenService.verifyAccessToken(accessToken);
		if (!userData) {
			CustomeErrorHandler.excutionFailed(" token doesn't contain information");
		}

		req.user = userData;
		next();
	} catch (error) {
		return next(CustomeErrorHandler.isunAuthorized("Invalid access token"));
	}
};

export default authMiddleware;
