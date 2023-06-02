import { type NextFunction, type Request, type Response } from "express";
import Queen from "../../../schemas/queen/queenSchema.js";
import statuscode from "../../response/statuscodes.js";

const getQueens = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queens = await Queen.find().limit(10).exec();

    res.status(statuscode.OK).json({ queens });
  } catch (error) {
    next(error);
  }
};

export default getQueens;
