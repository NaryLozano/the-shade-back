import { Router } from "express";
import getQueens from "../../controllers/queensController/queensController.js";
import auth from "../../middlewares/authMiddleware/authMiddleware.js";
import paths from "../../paths/paths.js";

const queensRouter = Router();

queensRouter.get(paths.root, auth, getQueens);

export default queensRouter;
