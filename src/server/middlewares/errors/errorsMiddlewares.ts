import createDebug from "debug";
import { type Request, type Response, type NextFunction } from "express";
import type CustomError from "../../CustomError/CustomError";

const debug = createDebug("the-shade-of-it-all-api:server:middlewares:errors");

const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  debug(error.message);

  const errorMessage = error.publicMessage ?? "Internal Server Error";
  const errorStatusCode = error.statusCode ?? 500;

  res.status(errorStatusCode).json({ message: errorMessage });
};

export default generalError;
