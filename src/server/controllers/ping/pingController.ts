import { type Request, type Response } from "express";
import statusCode from "../../response/statuscodes.js";
import messages from "../../response/messages.js";

const pingController = (req: Request, res: Response) => {
  res.status(statusCode.ok).json({ message: messages.pong });
};

export default pingController;
