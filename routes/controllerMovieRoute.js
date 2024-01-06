import express from "express";
import getAllMovie, {createMovie,  getMovie, deleteMovie, updateMovie} from "../controllers/movieController.js"
import controllerAuth from "../middleware/controllerAuth.js";

const controllerMovieRouter = express.Router();

controllerMovieRouter.use(controllerAuth);

controllerMovieRouter.get("/", getAllMovie);

controllerMovieRouter.get("/:id",getMovie);

controllerMovieRouter.post("/", createMovie);

controllerMovieRouter.delete("/:id",deleteMovie);

controllerMovieRouter.patch("/:id",updateMovie);


export default controllerMovieRouter;