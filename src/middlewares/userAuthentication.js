const jwt = require("jsonwebtoken");
const User  = require("../models/user");
//check user is logged in or not
async function userAth(req,res,next){
   try{
     let cookies = req.cookies;
    let {token} = cookies;
    if(!token){
        throw new Error(`Please log in again`);
    }
    let result = jwt.verify(token, "Thisismy@SECRETkey#12905567");
    let {userId} = result;
    const user = await User.findById(userId);
    if(!user){
        throw new Error(`Please log in again`);
    }
    req.user = user;
    next();
    }catch(err){
        res.status(500).send(`Something went wrong`);
        console.log(`from auth`,err);
    }
}

module.exports = {userAth};