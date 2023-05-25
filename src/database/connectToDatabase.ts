import createDebug from "debug";
import mongoose from "mongoose";
import chalk from "chalk";

const debug = createDebug("the-shade-of-it-all-api:connectToDatabase");

const connectToDataBase = async (connectionDB: string) => {
  try {
    mongoose.set("debug", true);

    mongoose.set("toJSON", {
      virtuals: true,
      versionKey: false,
      transform(doc, ret) {
        delete ret._id;
      },
    });
    await mongoose.connect(connectionDB);
  } catch (error: unknown) {
    debug(
      `Error connecting to database${chalk.redBright((error as Error).message)}`
    );
  }
};

export default connectToDataBase;
