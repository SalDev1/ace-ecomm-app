const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("./catchAsyncErrors.js");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel.js");

exports.isAuthenicatorUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login to access the website", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await userModel.findById(decodedData.id);
  next();
});

exports.authorizeRoles = (...roles) => {
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
