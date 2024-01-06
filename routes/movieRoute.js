import express from "express";
import getAllMovie, {createMovie,  getMovie, deleteMovie, updateMovie, getAllMovieByUser} from "../controllers/movieController.js"
import requireAuth from "../middleware/requireAuth.js";

const movieRouter = express.Router();

movieRouter.get("/getAll", getAllMovie);

movieRouter.get("/getOne/:id",getMovie);


//authorization
movieRouter.use(requireAuth);

movieRouter.post("/create", createMovie);

movieRouter.get("/myCreation", getAllMovieByUser);

movieRouter.delete("/delete/:id",deleteMovie);

movieRouter.patch("/update/:id",updateMovie);


export default movieRouter;