const express = require('express');
const userRouter = express.Router();
const {userAuth} = require("../middlewares/userAuthentication");
const ConnectionRequest = require("../models/connections.js");
const User = require("../models/user.js");
const { connect } = require('mongoose');


//see all pending request
userRouter.get("/user/requests/pending", userAuth,async(req,res)=>{

    try{
        const loggedInUser = req.user;
        if(!loggedInUser){
            throw new Error(`Please login again`)
        }

        let allPendingRequestOfLoginUser = await ConnectionRequest.find({toUserId: loggedInUser._id, status : "intrested"}).populate("fromUserId", ["firstName", "lastName", "age", "gender", "photoUrl", "skills", "about"]);
        res.send(allPendingRequestOfLoginUser);

    }catch(err){
        res.send(`ERROR : ${err.message}`)
        console.log(err);
    }
})



//see all accepted connections
userRouter.get("/user/connections", userAuth, async(req,res)=>{
    try{
        const loggedInUser = req.user;
        if(!loggedInUser){
            throw new Error(`Please login again`)
        }
        let result = await ConnectionRequest.find({
            $or:[
                {fromUserId: loggedInUser._id , status: "accepted"},
                {toUserId : loggedInUser._id,  status: "accepted"}
            ]
        }).populate("fromUserId", ["firstName", "lastName", "age", "gender", "photoUrl", "skills", "about"]).populate("toUserId", ["firstName", "lastName", "age", "gender", "photoUrl", "skills", "about"])

        if(!result){
            throw new Error(`Nothing to show`)
        }

        let finalResult = result.map((connection)=>{
            console.log(loggedInUser._id);
            console.log(connection.fromUserId._id);
            console.log(connection.toUserId._id);
            if(loggedInUser._id.toString() === connection.fromUserId._id.toString()){
                return connection.toUserId; 
            }
            return connection.fromUserId;
        })

        res.send(finalResult);


    }catch(err){
        res.send(`ERROR : ${err.message}`)
        console.log(err);
    }
})






//feed
userRouter.get("/user/feed", userAuth, async(req,res)=>{
    try{
        const loggedInUser = req.user;
        if(!loggedInUser){
            throw new Error(`Please login again`)
        }

        //any activity of loggedin user in connection request
        let loggedInUserRequestData = await ConnectionRequest.find({
            $or: [
                {fromUserId : loggedInUser._id},
                {toUserId : loggedInUser._id}
            ]
        })
        
        //storing the unique userId with which the loggedin user has relation wrt to connection request db
        let userToHideFromFeed = new Set();
        loggedInUserRequestData.forEach((data)=>{
            userToHideFromFeed.add(data.fromUserId._id.toString());
            userToHideFromFeed.add(data.toUserId._id.toString());
        })

        //extract the remaining users that are not in userToHideFromFeed set loggedin userid also need to be added because if there is no intraction of a user or the user is new so there will be no trace of that user in connection request db and hence the user will his own card

        const users = await User.find({
            $and:[
                {_id : {$nin : Array.from(userToHideFromFeed)}},
                {_id : {$ne : loggedInUser._id}}
            ]
        }).select(["firstName", "lastName", "age", "gender", "photoUrl", "skills", "about"])

        // console.log("Length of users feed",users.length);
        res.send(users);
    }catch(err){
        res.send(`ERROR : ${err.message}`)
        console.log(err);
    }
})

module.exports = userRouter;