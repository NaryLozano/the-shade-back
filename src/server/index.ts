import "../loadEnvironments.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import {
  errorNotFound,
  generalError,
} from "./middlewares/errors/errorsMiddlewares.js";
import pingController from "./controllers/ping/pingController.js";

export const app = express();

app.use(express.json());

app.disable("x-powered-by");

const devOrigin = process.env.ALLOWED_ORIGIN_DEV;

app.use(cors({ origin: devOrigin }));

app.use(morgan("dev"));

app.get("/", pingController);

app.use(errorNotFound);
app.use(generalError);
