import { type NextFunction, type Request, type Response } from "express";
import Queen from "../../../schemas/queen/queenSchema";
import queensMock from "../../../mocks/queensMock";
import statuscode from "../../response/statuscodes";
import { getQueens } from "./queensController";
import messages from "../../response/messages";

beforeEach(() => {
  jest.clearAllMocks();
});
describe("Given a getQueens middleware", () => {
  const req = {};
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();
  describe("When it receives a request", () => {
    Queen.find = jest.fn().mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(queensMock),
    });
    test("Then it should call the response's status method with the status code 200", async () => {
      const expectedStatus = statuscode.OK;

      await getQueens(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
    test("then it should call the response's method json with the List of queens", async () => {
      const expectedJson = { queens: queensMock };
      await getQueens(req as Request, res as Response, next as NextFunction);

      expect(res.json).toHaveBeenCalledWith(expectedJson);
    });
  });
  describe("When it receives a request and it is rejected", () => {
    test("Then it should call the response's status method with the status code ", async () => {
      const error = new Error(messages.conflictMessage);
      Queen.find = jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockRejectedValue(error),
      });

      await getQueens(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
