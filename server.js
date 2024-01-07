import express from "express";
import movieRouter from "./routes/movieRoute.js";
import userRouter from "./routes/userRoute.js"
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import controllerRouter from "./routes/controllerRoute.js";
import controllerMovieRouter from "./routes/controllerMovieRoute.js";
dotenv.config();



//express app
const app = express();
const URI = "mongodb+srv://kavyj:83xqKaglgCo3jRc6@movi.wltgqtn.mongodb.net/movi?retryWrites=true&w=majority";
const PORT =  5000;

app.use(express.json());
app.use(cors());

app.use("/api/movie", movieRouter);
app.use("/api/user", userRouter);
app.use("/api/admin",controllerRouter);
app.use("/api/control/movie",controllerMovieRouter);

mongoose.connect(URI)
.then(()=>{
    app.listen(PORT,()=>{
        console.log("listening to port", PORT);
    });
})
.catch((error)=> {
    console.log(error);
})



