import { type Request, type Response } from "express";
import pingController from "./pingController";

describe("Given a pingController controller", () => {
  describe("When it receives a response", () => {
    const req = {};
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    test("Then it should call the response's status method with the statuscode 200", () => {
      const expectedstatusCode = 200;

      pingController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedstatusCode);
    });
    test("Then it should call the response's json method with '🏓 Pong'", () => {
      const expectedResponseBody = { message: "🏓 Pong" };

      pingController(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith(expectedResponseBody);
    });
  });
});
