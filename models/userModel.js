import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";


const Schema = mongoose.Schema;

const userSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Array
    }
},
{timestamps: true}
)

//static signup method
userSchema.statics.signup = async function (email, first_name, last_name, dob, password){

    //validation
    if(!email || !password||!first_name||!last_name||!dob){
        throw Error("All fields must be filled!");
    }
    if(!validator.isEmail(email)){
        throw Error("Email is not Valid!");
    }

    //minimum 8 characters, at least one upercase , at least
    //one lower case, one special charactar

    if(!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough");
    }

   const exist = await this.findOne({email});
   if(exist){
    throw Error("Email already in use.");
   } 
   const salt = await bcrypt.genSalt(10);
   const hash = await bcrypt.hash(password, salt);

   const newUser = await this.create({
    email: email,
    password: hash,
    first_name:  first_name,
    last_name:  last_name,
    dob:  new Date(dob)//yyyy-mm-dd
   });

   return newUser;
}


//static login method
userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error("All fields must be filled!");
    }

    const user = await this.findOne({email});

    if(!user) {
        throw Error("Incorrect email")
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match){
        throw Error("Incorrect password");
    }

    return user;

}


export default mongoose.model('User',userSchema);