import express from "express";
import products from "./routes/productRoute.js";
import errorMiddleware from "./middleware/error.js";
import user from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import order from "./routes/orderRoute.js";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import payment from "./routes/paymentRoute.js";
import dotenv from "dotenv";
import cors from "cors";
import * as url from "url";
import path from "path";
import { readdirSync } from "fs";

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

const __dirname = url.fileURLToPath(new URL("./client", import.meta.url));

console.log(__dirname);

app.use(express.static(path.join(__dirname, "/client")));

console.log(path.join(__dirname, "/build/index.html"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});

// Middleware for error.
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.json("Welcome to the API");
});

export default app;
