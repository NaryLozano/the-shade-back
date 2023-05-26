import type * as core from "express-serve-static-core";
import { type Request } from "express";
export interface CustomResponse {
  status: number;
  body: { message: string };
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
