import { type NextFunction, type Request, type Response } from "express";
import Queen from "../../../schemas/queen/queenSchema";
import { queensMock, queensMockToDelete } from "../../../mocks/queensMock";
import statuscode from "../../response/statuscodes";
import { addQueen, deleteQueen, getQueens } from "./queensController";
import messages from "../../response/messages";
import { type CustomRequest } from "../../../types/testUtils";
import { type QueenStructureRequest } from "../../../types/types";

beforeEach(() => {
  jest.clearAllMocks();
});

const req = {
  query: {
    limit: 0,
    skip: 0,
  },
};

const res: Pick<Response, "status" | "json"> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

describe("Given a getQueens middleware", () => {
  describe("When it receives a request", () => {
    Queen.find = jest.fn().mockReturnValue({
      skip: jest.fn().mockReturnValue({
        limit: jest
          .fn()
          .mockReturnValue({ exec: jest.fn().mockResolvedValue(queensMock) }),
      }),
    });
    test("Then it should call the response's status method with the status code 200", async () => {
      const expectedStatus = statuscode.OK;

      await getQueens(
        req as unknown as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
    test("then it should call the response's method json with the List of queens", async () => {
      const expectedJson = { queens: queensMock };
      await getQueens(
        req as unknown as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith(expectedJson);
    });
  });
  describe("When it receives a request and it is rejected", () => {
    test("Then it should call next function with the error ", async () => {
      const error = new Error(messages.conflictMessage);
      Queen.find = jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockRejectedValue(error),
      });

      await getQueens(
        req as unknown as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a deleteQueen middleware", () => {
  const reqId: Partial<CustomRequest> = {
    params: { id: queensMockToDelete[1]._id.toString() },
  };
  describe("When it receives a request", () => {
    test("Then it should call the response's method status with the statuscode 200", async () => {
      const expectedStatus = statuscode.OK;
      Queen.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(queensMockToDelete[1]),
      });

      await deleteQueen(
        reqId as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });
  describe("When it receives a request a it's rejected", () => {
    test("Then it should call the next fucntion with the error", async () => {
      const error = new Error(messages.conflictMessage);
      Queen.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(error),
      });

      await deleteQueen(
        reqId as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalled();
    });
    test("Then it should call the response's status method with the statuscode 404", async () => {
      const error = new Error(messages.conflictMessage);
      Queen.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(error),
      });

      await deleteQueen(
        reqId as Request,
        res as Response,
        next as NextFunction
      );
    });
  });
});

describe("Given a AddQueen controller", () => {
  describe("When it receives a request with a new queen", () => {
    test("Then it should call the response's status method with the statuscode 201", async () => {
      Queen.create = jest.fn().mockReturnValue(queensMock[0]);
      const expectedStatus = statuscode.created;
      const req: Pick<QueenStructureRequest, "body" | "userId"> = {
        body: queensMock[0],
        userId: "647b6699d481019ce94a021d",
      };

      await addQueen(
        req as QueenStructureRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });
  describe("When it receives a request with a new queen and its rejected", () => {
    test("Then it should call the next function with the error", async () => {
      const error = new Error(messages.conflictMessage);
      Queen.create = jest.fn().mockRejectedValue(error);

      await addQueen(
        req as unknown as QueenStructureRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalled();
    });
  });
});
