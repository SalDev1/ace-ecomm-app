import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong Mongodb Id error.
  if (err.name == "CastError") {
    const message = `Resource not found . Invalid : ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT Error
  if (err.token == "JsonwebtokenError") {
    const message = "Json web token is valid , try again later.";
    err = new ErrorHandler(message, 400);
  }

  // JWT EXPIRE ERROR
  if (err.token == "TokenExpireError") {
    const message = "Json web token is expired , try again.";
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
