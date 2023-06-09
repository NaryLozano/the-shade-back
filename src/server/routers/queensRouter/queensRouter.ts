import { Router } from "express";
import auth from "../../middlewares/authMiddleware/authMiddleware.js";
import paths from "../../paths/paths.js";
import {
  addQueen,
  deleteQueen,
  getQueens,
} from "../../controllers/queensController/queensController.js";

const queensRouter = Router();

queensRouter.get(paths.root, auth, getQueens);

queensRouter.delete(paths.idQueen, auth, deleteQueen);

queensRouter.post(paths.add, auth, addQueen);

export default queensRouter;
