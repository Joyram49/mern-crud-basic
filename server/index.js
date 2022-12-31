const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middlewares/errorMiddleware");
const routes = require("./routes/userRoutes");

const app = express();

// third party and built-in middlewares
app.use(cors());
app.use(express.json());
dotenv.config({ path: ".env" });
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 9000;

// database connection
// mongoose.set("strictQuery", false);
// mongoose
//   .connect(process.env.ATLAS_URI, {
//     useNewUrlParser: true,
//   })
//   .then(() => {
//     console.log("database connected successfully!!");
//   })
//   .catch((err) => {
//     throw new Error(err);
//   });

const connectDB = async () => {
  try {
    await mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//  use api routes
app.use("/api", routes);

// error middleware
app.use(errorMiddleware);

// server listener
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests");
  });
});
