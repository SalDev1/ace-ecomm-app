const mongoose = require("mongoose");

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

module.exports = connectDatabase;
