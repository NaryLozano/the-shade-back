import { type NextFunction, type Request, type Response } from "express";
import Queen from "../../../schemas/queen/queenSchema";
import queensMock from "../../../mocks/queensMock";
import statuscode from "../../response/statuscodes";
import getQueens from "./queensController";

describe("Given a getQueens middleware", () => {
  describe("When it receives a request", () => {
    test("Then it should call the response's status method with the status code 200", async () => {
      const req = {};
      const res: Pick<Response, "status" | "json"> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      Queen.find = jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(queensMock),
      });

      const expectedStatus = statuscode.OK;

      await getQueens(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });
});
