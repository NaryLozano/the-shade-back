import type * as core from "express-serve-static-core";
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

export interface CustomRequest<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query,
  Locals extends Record<string, any> = Record<string, any>
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  userId: string;
}

export interface CustomRequestParams extends Request {
  query: { filter?: string; filterValue?: string; limit: string; skip: string };
}
