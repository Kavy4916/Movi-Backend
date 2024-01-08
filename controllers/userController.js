import mongoose from "mongoose";
import User from "../models/userModel.js";
import Movie from "../models/movieModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const createToken = (_id) => {
  return jwt.sign({ _id }, "22103086kavyjaiswalcomputerscience", {
    expiresIn: "3d",
  });
};

//login
const loginUser = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await User.login(email, password);


    //create Token
    const token = createToken(user._id);
    res.status(200).json({ error: false, email, token });
  } catch (error) {
    res.status(400).json({ error: true, errorMessage: error.message });
  }
};

//signup
const signupUser = async (req, res) => {
  const { email, first_name, last_name, dob, password, verified, otp } =
    req.body;
  console.log(req.body);
  try {
    const user = await User.signup(
      email,
      first_name,
      last_name,
      dob,
      password,
      verified,
      otp
    );
    if (user.verified) {
      const token = createToken(user.createdUser._id);
      res.status(200).json({ error: false, email, token, verified });
    } else {
      res.status(200).json({ ...user });
    }
  } catch (error) {
    res.status(400).json({ error: true, errorMessage: error.message });
  }
};


//add movie to user watch list
const addMovieToWL = async (req, res) => {
  const { post_id } = req.body;
  const id = req.user._id;
  const prevWatchList = req.user.watchList;
  function check(cur) {
    return cur === post_id;
  }
  const exist = prevWatchList.find(check);
  if (exist) {
    res.status(200).json({ error: false });
  } else {
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        watchList: [...prevWatchList, post_id],
      }
    );
    if (user) {
      res.status(200).json({ error: false });
    } else {
      res.status(200).json({ error: true });
    }
  }
};


const getWatchList = async(req, res) => {
  const watchList = req.user.watchList;
  const empty = (watchList.length === 0);
  let allMovie = [];
  let response, cur;
  for(let i = 0;i < watchList.length;i++){
    cur = watchList[i];
    response = await Movie.findById(cur);
    allMovie[i]=response;
}
  res.status(200).json({error: false, allMovie: allMovie, empty});
}


export { loginUser, signupUser, addMovieToWL, getWatchList };

