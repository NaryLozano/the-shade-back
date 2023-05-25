import { type Request } from "express";

export type UserCredentialsRequest = Request<
  Record<string, any>,
  Record<string, any>,
  UserCredentials
>;

export interface UserCredentials {
  username: string;
  password: string;
}
