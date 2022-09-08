import mongoose from "mongoose";

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: String,
  })
);

export default User;
