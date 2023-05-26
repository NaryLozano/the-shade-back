import { type Request, type Response } from "express";
import statuscode from "../../response/statuscodes.js";
import messages from "../../response/messages.js";

const pingController = (req: Request, res: Response) => {
  res.status(statuscode.OK).json({ message: messages.pong });
};

export default pingController;
