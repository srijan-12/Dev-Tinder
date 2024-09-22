const mongoose = require("mongoose");

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
    unique: true
  },
  phoneNumber: {
    type: Number,
    unique : true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8, 
    validate(value) {
      
      const alphanumericRegex = /^[a-zA-Z0-9]+$/;
      if (!alphanumericRegex.test(value)) {
        throw new Error('Password must be alphanumeric and at least 8 characters long.');
      }
    },
  },
  age: {
    type: Number,
    min: 18,
    // validate(value) {
    //   if (value < 18) {
    //     throw new Error('You have to be 18+');
    //   }
    // },
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "others"].includes(value)) {
        throw new Error('Invalid gender. Please choose between "male", "female", or "others".');
      }
    },
  },
  photoUrl: {
    type: String,
    default: "xyz//+123DEFVAL",
  }
}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema);
module.exports = User;