const mongoose = require("mongoose");
const validator = require("validator");
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
    default: "https://akshaysaini.in/img/akshay.jpg",
    validate(value){
        if(!validator.isURL(value)){
            throw new Error(`Enter correct url`)
        }
    }
  }
}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema);
module.exports = User;