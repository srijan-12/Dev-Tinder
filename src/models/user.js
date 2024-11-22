const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true, 
    trim: true, 
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error(`Invalid email`);
        }
    }
  },
  phoneNumber: {
    type: Number,
    unique : true,
    required : true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8, 
    validate(value) {
        if(!validator.isStrongPassword(value)){
            throw new Error(`Password is vernuable, try with alphanumeric and special characters together`);
        }
    },
  },
  age: {
    type: Number,
    min: 18,
    required : true
  },
  gender: {
    type: String,
    required : true,
    validate(value) {
      if (!["male", "female", "others"].includes(value)) {
        throw new Error('Invalid gender. Please choose between "male", "female", or "others".');
      }
    },
  },
  photoUrl: {
    type: String,
    default: "https://thequotecircle.org/wp-content/uploads/2022/06/blank-profile-picture-hd-images-photo.jpg.webp",
    validate(value){
        if(!validator.isURL(value)){
            throw new Error(`Enter correct url`)
        }
    }
  },
  skills: {
    type : [String],
    require : true
  },
  about : {
    type : String,
    required : true,
    trim : true
  }
}, {
  timestamps: true,
});


userSchema.methods.getJWT = async function(){
  const user = this;
  const token = await jwt.sign({_id : user._id}, "s3cR3tK3y!@$qW3rTy!9^kLpXyZ#8fBvNmA1", {
    expiresIn : "1d"
  })
  return token;
}


const User = mongoose.model("User", userSchema);
module.exports = User;