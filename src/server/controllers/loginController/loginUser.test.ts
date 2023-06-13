import { type NextFunction, type Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import {
  type UserStructure,
  type UserCredentialsRequest,
} from "../../../types/types";
import { loginUser } from "./loginController.js";
import User from "../../../database/users/users.js";
import CustomError from "../../CustomError/CustomError.js";
import statusCode from "../../response/statuscodes.js";
import messages from "../../response/messages.js";
import { invalidUser, mockToken, validUser } from "../../../mocks/mocks.js";

describe("Given a loginUser middleware", () => {
  const req: Pick<UserCredentialsRequest, "body"> = {
    body: validUser,
  };

  bcrypt.compare = jest.fn().mockResolvedValue(true);

  const user: UserStructure = {
    _id: new Types.ObjectId().toString(),
    password: "pinacolada",
    username: "rupertHolmes",
  };

  User.findOne = jest
    .fn()
    .mockReturnValue({ exec: jest.fn().mockResolvedValue(user) });
  jwt.sign = jest.fn().mockReturnValue(mockToken);

  const expectedStatusCode = statusCode.ok;

  const next = jest.fn();

  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When it receives a request with valid credentials", () => {
    test("Then it should call the response status method with the status code 200", async () => {
      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );
      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
    test("Then it should call the response's json method with token", async () => {
      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );
      expect(res.json).toHaveBeenCalledWith({ token: mockToken });
    });
  });
  describe("When it receives invalid user credentials and a next function", () => {
    test("Then it should call the next function with the error 'Invalid credentials' and status code 401", async () => {
      const error = new CustomError(
        messages.invalidCredentialsMessage,
        statusCode.unauthorized
      );

      const requestInvalid: Pick<UserCredentialsRequest, "body"> = {
        body: invalidUser,
      };

      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await loginUser(
        requestInvalid as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
