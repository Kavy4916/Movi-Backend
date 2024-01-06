 import mongoose from "mongoose";


 const Schema = mongoose.Schema;

 const moviSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    synopsis: {
        type: String,
        required: true
    },
    url: {
        type: String
    },
    year: {
        type: String,
        required: true
    },
    language: {
        type: Array
    },
    gener: {
        type: Array
    },
    cast: {
        type: Array
    },
    director: {
        type: String
    },
    writer: {
        type: String
    },
    createrEmail: {
        type:String,
        required: true
    },
    youtubeUrl: {
        type:String
    },
    imdb: {
        type:Number
    },
    rt: {
        type:Number
    },
    verified: {
        type: Boolean,
        required: true
    },
    likes: {
        type: Array,
    },
    comments: {
        type: Array,
    },
    userAge: {
        type: String, 
    },
    createrName: {
        type: String, 
    },
    moviRattingUser: {
        type: Array
    },
    moviRatting: {
        type: Number
    },
    moviRattingCount: {
        type: Number
    },
 },{timestamps: true})

 const Movie = mongoose.model("movie",moviSchema);
 export default Movie;