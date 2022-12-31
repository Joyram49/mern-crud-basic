const express = require("express");
const routes = express.Router();
const User = require("../schema/userSchema");
const asyncHandler = require("express-async-handler");

// get all user
routes.get(
  "/user",
  asyncHandler(async (req, res) => {
    const users = await User.find({}).select(
      "name email gender status date _id"
    );
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(400);
      throw new Error("failed to load users");
    }
  })
);

// get a user
routes.get(
  "/user/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id, "name email gender status date _id");
    if (user) {
      const { name, email, gender, status, date, _id } = user;
      res.status(200).json({
        name,
        email,
        gender,
        status,
        date,
        _id,
      });
    } else {
      res.status(400);
      throw new Error("failed to load users");
    }
  })
);

// post a user
routes.post(
  "/user",
  asyncHandler(async (req, res) => {
    const { name, email, gender, status } = req.body;
    // validation
    if (!name || !email) {
      res.status(400);
      throw new Error("Please fill the required fields");
    }

    // check if user email is already exist
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("Email has already been registered");
    }

    // create new user
    const newUser = new User(req.body);
    const createdUser = await newUser.save();
    if (createdUser) {
      res.status(200).json(createdUser);
    } else {
      res.status(400);
      throw new Error("failed to create user");
    }
  })
);

// update a user// get a user
routes.put(
  "/user/:id",
  asyncHandler(async (req, res) => {
    if (!req.body) {
      res.status(204);
      throw new Error("cannot update data with empty body");
    }
    const id = req.params.id;
    const newUser = await User.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (newUser) {
      const { name, email, gender, status, date, _id } = newUser;
      res.status(200).json({
        _id,
        name,
        email,
        gender,
        status,
        date,
      });
    } else {
      res.status(400);
      throw new Error("failed to update user");
    }
  })
);

// delete a user
routes.delete(
  "/user/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndRemove({ _id: id });
    if (deletedUser) {
      const { _id } = deletedUser;
      res.status(200).json({
        message: `user with ${_id} id has deleted`,
      });
    } else {
      res.status(400);
      throw new Error("failed to delete user");
    }
  })
);

module.exports = routes;
