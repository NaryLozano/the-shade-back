import { type NextFunction, type Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { type UserCredentialsRequest } from "../../../types/types";
import User from "../../../database/users/users.js";
import CustomError from "../../CustomError/CustomError.js";
import statusCode from "../../response/statuscodes.js";
import messages from "../../response/messages.js";

export const loginUser = async (
  req: UserCredentialsRequest,
  res: Response,
  next: NextFunction
) => {
  const { password, username } = req.body;

  try {
    const user = await User.findOne({ username }).exec();
    if (!user || !(await bcrypt.compare(password, user.password))) {
      const invalidCredentials = new CustomError(
        messages.invalidCredentialsMessage,
        statusCode.unauthorized
      );
      throw invalidCredentials;
    }

    const tokenPayload = {
      sub: user._id.toString(),
      user: user.username,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "80d",
    });

    res.status(statusCode.ok).json({ token });
  } catch (error) {
    next(error);
  }
};
