import { type Request, type Response, type NextFunction } from "express";
import CustomError from "../../CustomError/CustomError.js";
import { errorNotFound, generalError } from "./errorsMiddlewares.js";
import statuscode from "../../response/statuscodes.js";
import messages from "../../response/messages.js";

type CustomResponse = Pick<Response, "status" | "json">;

beforeEach(() => {
  jest.clearAllMocks();
});
describe("Given a generalError middleware", () => {
  describe("When its called with an unknow error", () => {
    test("Then it should call the response's status method with 500 and json method with 'Internal Server Error'", () => {
      const error = new Error(messages.internalServerErrorMessage);
      const statusCode = statuscode.internalServerError;
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

describe("Given a errorNotFound middleware", () => {
  describe("When it receives a next function", () => {
    test("Then it should call the received next fucntion with a statuscode 404 and a message 'Endpoint not found'", () => {
      const req = {};
      const res = {};
      const next = jest.fn();

      const expectedError = new CustomError(
        messages.notFoundMessage,
        statuscode.notFound
      );

      errorNotFound(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
