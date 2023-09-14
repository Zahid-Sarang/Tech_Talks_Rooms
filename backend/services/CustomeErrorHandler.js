class CustomeErrorHandler extends Error {
	constructor(status, mesg) {
		super();
		this.status = status;
		this.message = mesg;
	}
	static excutionFailed(message) {
		return new CustomeErrorHandler(400, message);
	}
	static messageFailed(message) {
		return new CustomeErrorHandler(500, message);
	}
	static databaseError(message) {
		return new CustomeErrorHandler(500, message);
	}
	static isunAuthorized(message) {
		return new CustomeErrorHandler(401,message)
	}
	static notFound(message) {
		return new CustomeErrorHandler(404,message)
	}
}

export default CustomeErrorHandler;
