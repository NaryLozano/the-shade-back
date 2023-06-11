import { type NextFunction, type Request, type Response } from "express";
import Queen from "../../../schemas/queen/queenSchema.js";
import statuscode from "../../response/statuscodes.js";
import messages from "../../response/messages.js";
import {
  type CustomRequestParams,
  type QueenStructureRequest,
} from "../../../types/types.js";
import { Types } from "mongoose";

export const getQueens = async (
  req: CustomRequestParams,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = Number(req.query.limit);
    const skip = Number(req.query.skip);
    const { filter } = req.query;
    const { filterValue } = req.query;

    if (filter) {
      const queens = await Queen.find({ [filter]: filterValue })
        .skip(skip)
        .limit(limit)
        .exec();
      const total = await Queen.where({
        [filter]: filterValue,
      }).countDocuments();

      res.status(statuscode.OK).json({ queens, total });
    } else {
      const queens = await Queen.find().skip(skip).limit(limit).exec();
      const total = await Queen.where({}).countDocuments();

      res.status(statuscode.OK).json({ queens, total });
    }
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

    await Queen.findByIdAndDelete(idQueen).exec();

    res.status(statuscode.OK).json(messages.idDeleted);
  } catch (error: unknown) {
    next(error);
  }
};

export const addQueen = async (
  req: QueenStructureRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId, body } = req;
  try {
    const newQueen = await Queen.create({
      ...body,
      user: new Types.ObjectId(userId),
    });

    res.status(statuscode.created).json({ newQueen });
  } catch (error: unknown) {
    next(error);
  }
};
