import express from "express";
import { getEdit, postEdit, remove, logout, see, startGithubLogin, finishGitHubLogin } from "../controllers/userController"
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGitHubLogin);
userRouter.get("/:id", see);

export default userRouter;