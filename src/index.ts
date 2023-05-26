import "./loadEnvironments.js";
import createDebug from "debug";
import { app } from "./server/index.js";
import connectToDataBase from "./database/connectToDatabase.js";

const debug = createDebug("the-shade-of-it-all-api:root");

const port = process.env.PORT ?? 4000;
const mongoDbConnection = process.env.MONGODB_CONNECTION!;

if (!mongoDbConnection) {
  debug("Missing environment variables");
  process.exit(1);
}

await connectToDataBase(mongoDbConnection);

app.listen(port, () => {
  debug(`Listening on http://localhost:${port}`);
});
