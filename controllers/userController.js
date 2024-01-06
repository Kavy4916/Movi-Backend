import mongoose from "mongoose";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();



const createToken  = (_id)=> {
    return jwt.sign({_id}, "22103086kavyjaiswalcomputerscience", {expiresIn: "3d"});
}


//login
const loginUser = async(req, res)=>{
    const{password, email} = req.body;
    try{
        const user = await User.login(email, password);

        //create Token
        const token = createToken(user._id);

        
        res.status(200).json({error: false, email, token});
    }catch(error){
        res.status(400).json({error: true, errorMessage: error.message});
    }
}



//signup
const signupUser = async(req, res)=>{
    const {email, first_name, last_name, dob, password} = req.body;
    try{
        const user = await User.signup(email, first_name, last_name, dob, password);
        const token = createToken(user._id);
        res.status(200).json({error: false, email, token});
    }catch(error){
        res.status(400).json({error: true, errorMessage: error.message});
    }
}

export {loginUser, signupUser};
