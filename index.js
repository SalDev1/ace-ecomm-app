const dotenv = require("dotenv");
const express = require("express");
const productRoutes = require("./routes/productRoute.js");
const app = require("./app.js");
const mongoose = require("mongoose");
const connectDatabase = require("./database/database.js");
const cloudinary = require("cloudinary");

// Handling uncaught expection.
// Eg:- console.log(youtube)
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Error : ${err.message}`);
  process.exit(1);
});
dotenv.config();
// Connect the database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

mongoose.connection.on("connected", () => {
  console.log("Mongodb is connected");
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working is on http://localhost:${process.env.PORT}`);
});

// Unhanlded Promise Rejection.
// Not properly adding the env details.
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down the server due to unhandled promise reejection");

  server.close(() => {
    process.exit(1);
  });
});
