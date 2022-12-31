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
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("database connected successfully!!");
  })
  .catch((err) => {
    throw new Error(err);
  });

//  use api routes
app.use("/api", routes);

// error middleware
app.use(errorMiddleware);

// server listener
app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
