import  jwt  from "jsonwebtoken";
import Controller from "../models/controllerModel.js";

const controllerAuth = async (req, res, next) => {

    //verify authentication
    const { authorization } = req.headers;

    if(!authorization){
        return res.status(401).json({error: true, errorMessage: "authorization token required"});
    }

    const token = authorization.split(' ')[1];

    try{
        //grabing id
        const {_id} = jwt.verify(token, "22103086kavyjaiswalcomputerscience");
        //finding user
        req.user = await Controller.findOne({_id}).select("email");
        //forwarding to the routes
        next();
    }catch(error){
        console.log(error);
        res.status(402).json({error: true, errorMessage: "Request not Authorized"});
    }

}

export default controllerAuth;