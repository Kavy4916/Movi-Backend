import mongoose from "mongoose";



const Schema = mongoose.Schema;

const controllerSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});



//static login method
controllerSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error("All fields must be filled!");
    }

    const controller = await this.findOne({email});

    if(!controller) {
        throw Error("Incorrect email")
    }

    if(!password === controller.password){
        throw Error("Incorrect password");
    }
    return controller;

}


export default mongoose.model('Controller',controllerSchema);