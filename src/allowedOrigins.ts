import "./loadEnvironments.js";
import type cors from "cors";
const allowedOrigins = [
  process.env.ALLOWED_ORIGIN_DEV!,
  process.env.ALLOWED_ORIGIN_PROD!,
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
export default options;
