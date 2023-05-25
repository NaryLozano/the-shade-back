import { type NextFunction, type Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import {
  type UserStructure,
  type UserCredentialsRequest,
} from "../../types/types";
import { loginUser } from "./loginController.js";
import User from "../../database/users/users.js";

describe("Given a loginUser middleware", () => {
  describe("When it receives a request with valid credentials", () => {
    test("Then it should call the response status method with the status code 200", async () => {
      const validUser = {
        password: "pinacolada",
        username: "rupertholmes",
      };

      const req: Pick<UserCredentialsRequest, "body"> = {
        body: validUser,
      };

      bcrypt.compare = jest.fn().mockResolvedValue(true);

      const user: UserStructure = {
        _id: new Types.ObjectId().toString(),
        password: "pinacolada",
        username: "rupertHolmes",
      };

      const token = "aTokenToRuleThemAll";

      User.findOne = jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(user) });
      jwt.sign = jest.fn().mockReturnValue(token);

      const expectedStatusCode = 200;

      const next = jest.fn();

      const res: Pick<Response, "status" | "json"> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });
});
