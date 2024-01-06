import mongoose from "mongoose";
import Controller from "../models/controllerModel.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();



const createToken  = (_id)=> {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: "3d"});
}


//login
const loginController = async(req, res)=>{
    const{password, email} = req.body;
    try{
        const controller = await Controller.login(email, password);

        //create Token
        const token = createToken(controller._id);

        
        res.status(200).json({error: false, email, token});
    }catch(error){
        console.log(error);
        res.status(400).json({error: true, errorMessage: error.message});
    }
}




export default loginController;