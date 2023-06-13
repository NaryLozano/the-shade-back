import { Router } from "express";
import auth from "../../middlewares/authMiddleware/authMiddleware.js";
import paths from "../../paths/paths.js";
import {
  addQueen,
  deleteQueen,
  getOneQueen,
  getQueens,
} from "../../controllers/queensController/queensController.js";

const queensRouter = Router();

queensRouter.get(paths.root, auth, getQueens);

queensRouter.get(paths.idQueen, auth, getOneQueen);

queensRouter.delete(paths.idQueen, auth, deleteQueen);

queensRouter.post(paths.add, auth, addQueen);

export default queensRouter;
