import "./loadEnvironments.js";
import createDebug from "debug";
import { app } from "./server/index.js";

const debug = createDebug("the-shade-of-it-all-api:root");

const port = process.env.PORT ?? 4000;

app.listen(port, () => {
  debug(`Listening on http://localhost:${port}`);
});
