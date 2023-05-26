import { Joi } from "express-validation";
import { type UserCredentials } from "../../types/types";

export const userLoginSchema = {
  body: Joi.object<UserCredentials>({
    password: Joi.string().required(),
    username: Joi.string().required(),
  }),
};
