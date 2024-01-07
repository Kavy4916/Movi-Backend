import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "kavyjaiswal4@gmail.com",
    pass: "tiwecayvchtjuing",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function verify(newUser) {
  // send mail with defined transport object
  const otp = Math.floor(1000 + Math.random() * 9000);
  const info = await transporter.sendMail({
    from: '"Movi" <kavyjaiswal4@gmail.com', // sender address
    to: newUser.email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: otp + ` is your otp for signup to Movi.in`, // plain text body
    html:  otp +" is your otp for signup to Movi.in", // html body
  });
  const result =  {...newUser, otp: otp};
  return result;
}




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
    },
    watchList: {
        type: Array
    }
},
{timestamps: true}
)

//static signup method
userSchema.statics.signup = async function(email, first_name, last_name, dob, password, verified, otp){

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
  
   const newUser = {
    email: email,
    password: password,
    first_name:  first_name,
    last_name:  last_name,
    dob:  new Date(dob),//yyyy-mm-dd
    verified: verified,
    otp: otp,
   };

   if(verified){
     const salt = await bcrypt.genSalt(10);
     const hash = await bcrypt.hash(password, salt);
     const createdUser = await this.create({email, first_name, last_name, dob, password: hash});
     return {verified, createdUser};
   }
   else{
      try{
        const result = await verify(newUser);
        return result;
      }catch(error){
        throw Error("Please enter a valid email.")
      }
   }
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