import "../loadEnvironments.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import {
  errorNotFound,
  generalError,
} from "./middlewares/errors/errorsMiddlewares.js";

import queensRouter from "./routers/queensRouter/queensRouter.js";
import paths from "./paths/paths.js";
import pingController from "./controllers/ping/pingController.js";
import userRouter from "./routers/user/userRouter.js";
import options from "../allowedOrigins.js";

export const app = express();

app.use(cors(options));

app.use(express.json());

app.disable("x-powered-by");

app.use(morgan("dev"));

app.get(paths.root, pingController);
app.use(paths.user, userRouter);

app.use(paths.queens, queensRouter);

app.use(errorNotFound);
app.use(generalError);
