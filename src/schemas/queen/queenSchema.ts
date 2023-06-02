import { Schema, Types, model } from "mongoose";
import User from "../../database/users/users.js";

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
  season: { type: Number, required: true },
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
    ref: User,
  },
});

const Queen = model("Queen", queenSchema, "queens");

export default Queen;
