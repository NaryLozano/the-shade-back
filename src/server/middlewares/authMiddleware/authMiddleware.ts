import "../../../loadEnvironments.js";
import { type NextFunction, type Response } from "express";
import jwt from "jsonwebtoken";
import { type CustomRequest } from "../../../types/testUtils.js";
import CustomError from "../../CustomError/CustomError.js";
import messages from "../../response/messages.js";
import statusCode from "../../response/statuscodes.js";

const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.header("Authorization");
    if (!authorizationHeader?.includes("Bearer")) {
      const error = new CustomError(
        messages.tokenInvalid,
        statusCode.tokenInvalid
      );

      throw error;
    }

    const token = authorizationHeader.replace("Bearer ", "");

    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    const userId = payload.sub as string;

    req.userId = userId;

    next();
  } catch (error: unknown) {
    const invalidTokenError =
      (error as Error).name === "JsonWebTokenError"
        ? new CustomError(messages.tokenInvalid, statusCode.tokenInvalid)
        : error;

    next(invalidTokenError);
  }
};

export default auth;
