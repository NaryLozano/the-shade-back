import "../loadEnvironments.js";
import express from "express";
import cors from "cors";

export const app = express();

app.use(express.json());

app.disable("x-powered-by");

const devOrigin = process.env.ALLOWED_ORIGIN_DEV;
app.use(cors({ origin: devOrigin }));
