import { Schema, Types, model } from "mongoose";

export const queenSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  rank: {
    type: String,
    required: true,
  },
  hometown: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
  },
});

const Queen = model("Queen", queenSchema, "queens");

export default Queen;
