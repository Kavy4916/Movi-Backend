import mongoose from "mongoose";
import Movie from "../models/movieModel.js";

//get all movies
 const getAllMovie = async(req, res)=>{
        const allMovie = await Movie.find({verified: true}).sort({createdAt: -1});
        if(allMovie){
            res.status(200).json({error: false, allMovie});
        }
        else{
            res.status(400).json({error: true, errorMessage: "Failed to fetch"});
        }
    }




//get a single movie
const getMovie = async(req, res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error: true, errorMessage: "File not exist"});
    }
    const movie = await Movie.findById(id);
    if(!movie)
    {
        return res.status(400).json({error: true, errorMessage: "Failed to fetch"});
    }
    res.status(200).json({error: false, movie});
 }




//create a new movie
const createMovie = async (req, res)=> {
    const {title, type, synopsis, year} = req.body;
    if(!title & !type & !synopsis & !year)
    {
        res.status(401).json({error: true, errorMessage: "All fields must be filled"})
    }
    const exist = await Movie.findOne({title});
    if(exist){
        res.status(400).json({ error: true, errorMessage: "Movie already exists"});
    }
    // add movie to db
    const verified = false;
    const createrEmail =  req.user.email;
    const youtubeUrl = "";
    const director = "";
    const writer = "";
    const url = "";
    const imdb = 0;
    const rt = 0;
    const userAge = "";
    const moviRatting = 0;
    const moviRattingCount = 0;
    const createrName = req.user.first_name;
    const movie = await Movie.create({title, type, synopsis, verified, year, createrEmail, youtubeUrl,
    director, writer, url, imdb, rt, userAge, moviRatting, moviRattingCount, createrName});
    if(movie){
        res.status(200).json({error: false, movie});
    }
    else{
        res.status(400).json({ error: true, errorMessage: "Failed to register"});
    }
}

//get all movies created by current user;
const getAllMovieByUser = async(req, res)=>{
    const createrEmail = req.user.email;
    const allMovie = await Movie.find({createrEmail});
    if(allMovie.length === 0)
    {
        res.status(200).json({empty: true});
    }
    else{
        res.status(200).json({empty: false, allMovie})
    }
}


//delete a movie
const deleteMovie = async(req, res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error: true, errorMessage: "Deletion failed, file does not exist!"});
    }
    const movie = await Movie.findByIdAndDelete(id);
    if(!movie)
    {
        return res.status(400).json({error: true, errorMessage: "Deletion failed, server error!"});
    }
        
    res.status(200).json({error: false, movie});
    
 }



//update a movie
const updateMovie = async(req,res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error: true, errorMessage:"Updation failed, file does not exist!"});
    }
    const movie = await Movie.findOneAndUpdate({_id: id}, {
        ...req.body
    }); 

    if(!movie)
    {
        return res.status(400).json({error: true, errorMessage: "Updation failed, server error!"});
    }
    
    const updatedMovie = await Movie.findById(id);
    res.status(200).json({error: false, updatedMovie});
}





export default getAllMovie;


export {
    createMovie,
    getMovie,
    deleteMovie,
    updateMovie,
    getAllMovieByUser
}