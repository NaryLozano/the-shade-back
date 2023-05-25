import { type Request, type Response, type NextFunction } from "express";
import type CustomError from "../../CustomError/CustomError.js";
import { generalError } from "./errorsMiddlewares.js";

type CustomResponse = Pick<Response, "status" | "json">;

beforeEach(() => {
  jest.clearAllMocks();
});
describe("Given a generalError middleware", () => {
  describe("When its called with an unknow error", () => {
    test("Then it should the response's status method with 500 and status Json with 'Internal Server Error'", () => {
      const error = new Error("Internal Server Error");
      const statusCode = 500;
      const { message } = error;

      const response: CustomResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const request = {};
      const next = jest.fn();

      generalError(
        error as CustomError,
        request as Request,
        response as Response,
        next as NextFunction
      );

      expect(response.status).toHaveBeenCalledWith(statusCode);
      expect(response.json).toHaveBeenCalledWith({ message });
    });
  });
});
