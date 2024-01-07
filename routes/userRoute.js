import express from "express";
import { loginUser, signupUser, addMovieToWL, getWatchList} from "../controllers/userController.js";
import requireAuth from "../middleware/requireAuth.js";


const userRouter = express.Router();

//login
userRouter.post("/login",loginUser);

//signup
userRouter.post("/signup",signupUser);


//auth required
userRouter.use(requireAuth);


//add movie to watch list
userRouter.patch("/addMovieToWL",addMovieToWL);

//get all movie in watchlist
userRouter.get("/getWatchlist", getWatchList);

export default userRouter;