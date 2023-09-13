class CustomeErrorHandler extends Error {
    constructor(status,mesg) {
        super();
        this.status = status;
        this.message = mesg;
    }
    static phoneRequired(message) {
        return new CustomeErrorHandler(400,message);
    }
    static messageFailed(message) {
        return new CustomeErrorHandler(500,message);
    }

}

export default CustomeErrorHandler;