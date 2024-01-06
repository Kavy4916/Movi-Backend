import express from "express";
import { loginUser, signupUser } from "../controllers/userController.js";

const userRouter = express.Router();

//login
userRouter.post("/login",loginUser);




userRouter.post("/signup",signupUser);

export default userRouter;