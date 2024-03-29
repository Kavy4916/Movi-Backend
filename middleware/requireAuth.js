import  jwt  from "jsonwebtoken";
import User from "../models/userModel.js";

const requireAuth = async (req, res, next) => {

    //verify authentication
    const { authorization } = req.headers;

    if(!authorization){
        return res.status(401).json({error: true, errorMessage: "authorization token required"});
    }

    const token = authorization.split(' ')[1];

    try{
        //grabing id
        const {_id} = jwt.verify(token, process.env.SECRET);
        //finding user
        req.user = await User.findOne({_id});
        //forwarding to the routes
        next();
    }catch(error){
        console.log(error);
        res.status(401).json({error: true, errorMessage: "Request not Authorized"});
    }

}

export default requireAuth;