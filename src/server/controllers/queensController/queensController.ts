import { type NextFunction, type Request, type Response } from "express";
import Queen from "../../../schemas/queen/queenSchema";
import statuscode from "../../response/statuscodes";

const getQueens = (req: Request, res: Response, next: NextFunction) => {
  try {
    const queens = Queen.find().limit(10).exec();

    res.status(statuscode.OK).json({ queens });
  } catch (error) {
    next(error);
  }
};

export default getQueens;
