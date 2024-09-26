const express = require("express");
const connectionRequestRouter = express.Router();
const {userAuth} = require("../middlewares/userAuthentication.js");

const ConnectionRequest = require("../models/connections.js");
const User = require("../models/user.js");


connectionRequestRouter.post("/request/send/:status/:userId", userAuth, async(req,res)=>{
    try{
        let loggedInUser = req.user;


        if(!loggedInUser){
            throw new Error(`Please log in again`);
        }


        const status = req.params.status;
        const toUserId = req.params.userId;
        const fromUserId = loggedInUser._id;


        //status check
        const allowedStatus = ["intrested", "ignored"]
        if(!allowedStatus.includes(status)){
            throw new Error(`Status type is incorrect`);
        }

        //self request send check handled at db level using pre
        // if(loggedInUser._id.equals(toUserId)){
        //     throw new Error(`You cannot send request to yourself`)
        // }


        // user doesnot exists check 
        let foundToUser = await User.findById(toUserId);
        if(!foundToUser){
            throw new Error(`The user you are trying to send does not exists`)
        }



        //two way check
        const result = await ConnectionRequest.findOne({
            $or : [
                {fromUserId, toUserId},
                {fromUserId: toUserId  , toUserId: fromUserId}
            ]
        })

        if(result){
            let dataFrom = result.fromUserId
            let dataTo = result.toUserId;


            if(result && loggedInUser._id.equals(dataFrom)){
            
                throw new Error(`Connection request already sent`)
            }
            if(result && loggedInUser._id.equals(dataTo)){
                
                throw new Error(`Connection request is pending for approval`);
            }
        }



        
        

        const connectionRequestX = new ConnectionRequest({fromUserId,toUserId,status});
        await connectionRequestX.save();
        res.send(`check`);





    }catch(err){
        res.send(`ERROR : ${err.message}`)
        console.log(err);
    }
})

module.exports = connectionRequestRouter;