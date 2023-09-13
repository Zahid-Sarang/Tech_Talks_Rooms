import CustomErrorHandler from "../services/CustomeErrorHandler.js";

const errorHandler = (err,req,res,next) => {
    let statusCode = 500;
    let data = {
        message: "Internal server error",
		...(process.env.DEBUG_MODE === "true" && { originalError: err.message }),
    }

    // check custome error
    if(err instanceof CustomErrorHandler){
        statusCode = err.status;
        data = {
            message: err.message
        }
    }
    res.status(statusCode).json(data)
}

export default errorHandler;