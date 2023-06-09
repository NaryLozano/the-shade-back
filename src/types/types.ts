import { type Request } from "express";
import { type Types } from "mongoose";

export type UserCredentialsRequest = Request<
  Record<string, any>,
  Record<string, any>,
  UserCredentials
>;

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserStructure extends UserCredentials {
  _id: string;
}

export interface UserDb extends UserCredentials {
  _id: Types.ObjectId;
}

export interface QueenStructure {
  name: string;
  age: number;
  rank: string;
  season: number;
  hometown: string;
  image: string;
  user: string;
}

export interface QueenStructureRequest extends Request {
  body: QueenStructure;
  userId: string;
}
