const express = require("express");
const products = require("./routes/productRoute.js");
const errorMiddleware = require("./middleware/error.js");
const user = require("./routes/userRoute.js");
const cookieParser = require("cookie-parser");
const order = require("./routes/orderRoute.js");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const payment = require("./routes/paymentRoute.js");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

var app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors("Access-Control-Allow-Origin", "*"));

app.use("/api/v1", products);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// For deployment purposes.
/*
  As React only changes the component in the frontend , meaning
  everything works in the single page.
 */
dotenv.config();

app.use(express.static(path.join(__dirname, "./client/build")));

console.log(path.join(__dirname, "./client/build/index.html"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
// Middleware for error.
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.json("Welcome to the API");
});

module.exports = app;
