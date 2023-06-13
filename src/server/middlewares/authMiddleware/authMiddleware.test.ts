import { type Response, type Request, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import { mockTokenReal } from "../../../mocks/mocks.js";
import auth from "./authMiddleware.js";
import { type CustomRequest } from "../../../types/testUtils.js";
import CustomError from "../../CustomError/CustomError.js";
import messages from "../../response/messages.js";
import statusCode from "../../response/statuscodes.js";

beforeAll(() => {
  jest.clearAllMocks();
});
describe("Given an Auth middleware", () => {
  const token = mockTokenReal;
  const req: Pick<CustomRequest, "header" | "userId"> = {
    header: jest.fn().mockReturnValue(`Bearer ${token}`),
    userId: "",
  };
  const res = {};
  const next = jest.fn();

  describe("When it receives an authorization header with a valid token and a next function", () => {
    test("Then it should call the received next function", () => {
      jwt.verify = jest.fn();

      auth(req as CustomRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledTimes(1);
    });
  });

  describe("When it receives an authorization header with and invalid token and a next function", () => {
    test("Then it should call the received next function with a 498 'Token Expired or Invalid' error", () => {
      const expectedError = new CustomError(
        messages.tokenInvalid,
        statusCode.tokenInvalid
      );
      expectedError.name = "JsonWebTokenError";

      jwt.verify = jest.fn().mockImplementation(() => {
        throw expectedError;
      });

      auth(req as CustomRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When it receives an authorization Heades without bearer and a next function", () => {
    test("Then it should call the received next function with a 498 'Token Expired or Invalid'", () => {
      const req: Pick<Request, "header"> = {
        header: jest.fn().mockReturnValue(`${mockTokenReal}`),
      };
      const expectedError = new CustomError(
        messages.tokenInvalid,
        statusCode.tokenInvalid
      );

      auth(req as CustomRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
