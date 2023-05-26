import { Router } from "express";
import { loginUser } from "../../controllers/loginController/loginController.js";
import { validate } from "express-validation";
import { userLoginSchema } from "../../../schemas/user/userLoginSchema.js";
import paths from "../../paths/paths.js";

const userRouter = Router();

userRouter.post(
  paths.login,
  validate(userLoginSchema, {}, { abortEarly: false }),
  loginUser
);

export default userRouter;
