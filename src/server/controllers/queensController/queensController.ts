import { type NextFunction, type Request, type Response } from "express";
import Queen from "../../../schemas/queen/queenSchema.js";
import statuscode from "../../response/statuscodes.js";
import CustomError from "../../CustomError/CustomError.js";
import messages from "../../response/messages.js";

export const getQueens = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const queens = await Queen.find().limit(10).exec();

    res.status(statuscode.OK).json({ queens });
  } catch (error) {
    next(error);
  }
};

export const deleteQueen = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idQueen } = req.params;

    const queen = await Queen.findByIdAndDelete(idQueen).exec();

    if (!queen) {
      const error = new CustomError(messages.idNotFound, statuscode.notFound);
      throw error;
    }

    res.status(statuscode.OK).json(messages.idDeleted);
  } catch (error: unknown) {
    next(error);
  }
};
