import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const isAuthenicatorUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login to access the website", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await userModel.findById(decodedData.id);
  next();
});

export const authorizeRoles = (...roles) => {
  return (res, req, next) => {
    if (!roles.includes(res.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${res.user.role} is not allowed to acces this resource`,
          403
        )
      );
    }

    next();
  };
};
