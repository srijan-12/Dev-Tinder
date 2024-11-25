const express = require("express");
const profileRouter = express.Router();
const validator = require("validator");
const {userAuth} = require("../middlewares/userAuthentication.js");
const {validateProfileEdit} = require("../utils/validations.js");
const User = require("../models/user.js");
const {validateLogin} = require("../utils/validations.js")
const bcrypt = require("bcrypt");
const hashPassword = require("../utils/passwordEncrypt.js")

profileRouter.post("/profile/view",userAuth,(req,res)=>{
    try{
        let user = req.user;
        res.status(200).send(user);
    }catch(err){
        res.status(400).send(`ERROR : ${err.message}`);
    }
})


profileRouter.patch("/profile/edit",userAuth, async(req,res)=>{
    try{
        let userData = validateProfileEdit(req);
        console.log(userData)
        if (typeof(userData) === "string") throw new Error(userData);
        let allowedFields = ["firstName","lastName","phoneNumber","age","gender","photoUrl","skills","about"];
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

        let userX = await User.findByIdAndUpdate(loggedInUser._id, userData, {runValidators: true, new: true});
        res.status(200).send(`Updated`);

    }catch(err){
        console.log(err.message)
        res.status(400).send(`ERROR : ${err.message}`)
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
        if(!validator.isStrongPassword(newPassword)){
            throw new Error(`New password must be a strong password`);
        }
        let result = await bcrypt.compare(userPassword, loggedInUserHashPassword);
        if(!result){
            throw new Error(`Invalid credentials`);
        }else{
            let newPasswordHash = await hashPassword(newPassword);
            
            loggedInUser.password = newPasswordHash;
            await loggedInUser.save();
            res.status(200).send(`Password updated`);
        }

        
    }catch(err){
        res.status(400).send(`ERROR : ${err.message}`)
    }
})




module.exports = profileRouter;


