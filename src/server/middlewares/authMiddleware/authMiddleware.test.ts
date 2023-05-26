import { type Response, type Request, type NextFunction } from "express";
import { mockToken } from "../../../mocks/mocks";
import auth from "./authMiddleware";
import { type CustomRequest } from "../../../types/testUtils";

describe("Given an Auth middleware", () => {
  describe("When it receives an authorization header with a valid token and a next function", () => {
    test("Then it should call the received next function", () => {
      const token = mockToken;
      const req: Pick<Request, "header"> = {
        header: jest.fn().mockReturnValue(`Bearer${token}`),
      };
      const res = {};
      const next = jest.fn();

      auth(req as CustomRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });
});
