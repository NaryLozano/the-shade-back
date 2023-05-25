import createDebug from "debug";
import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../CustomError/CustomError.js";

const debug = createDebug("the-shade-of-it-all-api:server:middlewares:errors");

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  debug(error.message);

  const errorMessage = error.publicMessage ?? "Internal Server Error";
  const errorStatusCode = error.statusCode ?? 500;

  res.status(errorStatusCode).json({ message: errorMessage });
};

export const errorNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debug("Endpoint not Found");
  const error = new CustomError("Endpoint not Found", 404);
  next(error);
};