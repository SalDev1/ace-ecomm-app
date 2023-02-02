import mongoose from "mongoose";
import app from "../app.js";

const connectDatabase = () => {
  mongoose
    .connect(process.env.CONNECTION_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    })
    .then((req, res) => {
      console.log("Mongodb is connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectDatabase;
