const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/userAuthentication.js");
const {validateProfileEdit} = require("../utils/validations.js");
const { findByIdAndUpdate } = require("../models/user.js");
const User = require("../models/user.js");
const {validateLogin} = require("../utils/validations.js")
const bcrypt = require("bcrypt");
const hashPassword = require("../utils/passwordEncrypt.js")

profileRouter.post("/profile/view",userAuth,(req,res)=>{
    try{
        let user = req.user;
        res.send(user);
    }catch(err){
        res.send(`ERROR : ${err.message}`);
        console.log(err);
    }
})


profileRouter.patch("/profile/edit",userAuth, async(req,res)=>{
    try{
        let userData = validateProfileEdit(req);

        let allowedFields = ["firstName","lastName","phoneNumber","age","gender","photoUrl","skills","about"];
        console.log(Object.keys(userData));
        let isAllowed = Object.keys(userData).every((field)=>{
            return allowedFields.includes(field);
        })

        if(!isAllowed){
            throw new Error(`Information cannot be updated`)
        }

        if(Object.keys(userData).length === 0){
            throw new Error(`Nothing to update`)
        }

        let loggedInUser = req.user;
        console.log(loggedInUser);

        let userX = await User.findByIdAndUpdate(loggedInUser._id, userData, {runValidators: true, new: true});
        console.log(userX);
        res.send(`Updated`);

    }catch(err){
        res.send(`ERROR : ${err.message}`)
        console.log(err);
    }
})

profileRouter.patch("/profile/forgetpassword", userAuth,async(req,res)=>{
    try{
        let loggedInUser = req.user;

        let loggedInUserHashPassword = loggedInUser.password;
        if(!loggedInUserHashPassword){
            throw new Error(`Please log in again to reset password`);
        }
        validateLogin(req);
        const {email, password: userPassword, newPassword} = req.body;
        let result = await bcrypt.compare(userPassword, loggedInUserHashPassword);
        if(!result){
            throw new Error(`Invalid credentials`);
        }else{
            let newPasswordHash = await hashPassword(newPassword);
            
            loggedInUser.password = newPasswordHash;
            await loggedInUser.save();
            res.send(`Password updated`);
        }

        
    }catch(err){
        res.send(`ERROR : ${err.message}`)
        console.log(err);
    }
})




module.exports = profileRouter;


