import express from "express";
import loginController from "../controllers/controllerController.js";

const controllerRouter = express.Router();

//login
controllerRouter.post("/login",loginController);



export default controllerRouter;