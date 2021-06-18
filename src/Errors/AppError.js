const httpStatus = require("http-status");
const app = require("../../app");

class AppError extends Error {
    constructor(statusCode, message) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

const handleError = (err, res) => {
    const { statusCode, message } = err;
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    });

}
const convertToAppError = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof AppError)) {
        const statusCode = error.statusCode;
        const message = error.message;
        error = new AppError(statusCode, message)
    }
}

module.exports = {
    AppError,
    handleError,
    convertToAppError
}