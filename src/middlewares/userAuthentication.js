const jwt = require("jsonwebtoken");
const User  = require("../models/user.js");
//check user is logged in or not
async function userAuth(req,res,next){
   try{
     let cookies = req.cookies;
     if(!cookies){
        throw new Error(`Please log in again`);
    }
     let {token} = cookies;
    if(!token){
        throw new Error(`Please log in again`);
    }
    let result = jwt.verify(token, "s3cR3tK3y!@$qW3rTy!9^kLpXyZ#8fBvNmA1");
    console.log(result);
    let {_id} = result;
    const user = await User.findById(_id);
    if(!user){
        throw new Error(`Please log in again`);
    }
    req.user = user;
    next();
    }catch(err){
        res.status(500).send(`Something went wrong ${err.message}`);
        console.log(`from auth`,err);
    }
}

module.exports = {userAuth};