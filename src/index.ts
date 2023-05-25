import createDebug from "debug";

const debug = createDebug("the-shade-of-it-all-api:root");

const port = process.env.PORT ?? 4000;

debug(`Testing debug ${port}`);
