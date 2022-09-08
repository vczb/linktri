import mongoose from "mongoose";
const { Schema } = mongoose;

const Links = mongoose.model(
  "Links",
  new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    icon: String,
  })
);

export default Links;
