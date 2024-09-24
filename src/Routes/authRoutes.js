const express = require(`express`);
const authRouter = express.Router();
const {validateSignUp,validateLogin} = require("../utils/validations");
const hashPassword = require("../utils/passwordEncrypt");
const User = require("../models/user")
const bcrypt = require("bcrypt");



authRouter.post('/signup', async (req,res)=>{
    try{
        validateSignUp(req);
        const {firstName,lastName,email,phoneNumber,password,age,gender,photoUrl} = req.body;
        let hashedPassword = await hashPassword(password);

        let userX = new User({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: hashedPassword,
            age,
            gender,
            photoUrl
        })
        await userX.save();

        res.send(`User added`);

    }catch(err){
        res.send(`ERROR! ${err.message}`);
    }
})



authRouter.post("/login", async(req,res)=>{
    try{
        validateLogin(req);
        const {email, password:userPassword} = req.body;
        const foundUser = await User.findOne({email});
        if(!foundUser){
            throw new Error(`Enter valid credentials`);
        }
        else{
            const isValidate = await bcrypt.compare(userPassword, foundUser.password);
            
            if(isValidate){
                const token = await foundUser.getJWT();
                res.cookie("token", token, {maxAge: 7 * 24 * 60 * 60*1000})
                res.send(`Logged in`);
            }else{
                throw new Error(`Enter valid credentials`);
            }
        }
    }catch(err){
        res.send(`ERROR! ${err.message}`);
        console.log(err);
    }
})


authRouter.post("/logout", (req,res)=>{
    res.cookie("token", null, {
        maxAge : 0
    } )
    res.send("Logged out");
})









module.exports = authRouter;