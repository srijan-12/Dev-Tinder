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


            if(result && loggedInUser._id.equals(dataFrom) && (result.status ==="intrested" || result.status ==="ignored")){
            
                throw new Error(`Connection request already sent`);
            }
            if(result && loggedInUser._id.equals(dataFrom) && result.status == "accepted"){
            
                throw new Error(`You guys are already buddies`);
            }
            if(result && loggedInUser._id.equals(dataTo)&& (result.status ==="intrested" || result.status ==="ignored")){
                
                throw new Error(`Connection request is pending for approval`);
            }
            if(result && loggedInUser._id.equals(dataTo)&& result.status == "accepted"){
                
                throw new Error(`You guys are already buddies`);
            }else{
                throw new Error(`Bad Request`);
            }
        }else{
            const connectionRequestX = new ConnectionRequest({fromUserId,toUserId,status});
            await connectionRequestX.save();
            res.send(`Send`);
        }

        

    }catch(err){
        res.send(`ERROR : ${err.message}`)
        console.log(err);
    }
})



//accept/reject
connectionRequestRouter.post("/request/review/:status/:requestId", userAuth, async(req,res)=>{

   try{

    let loggedInUser = req.user;

    if(!loggedInUser){
        throw new Error(`Please log in again`);
    }

    const {status, requestId} = req.params;
    const loggedInUserId = loggedInUser._id;

    //validating status
    const allowedStatus = ["accepted", "rejected"];
    if(! allowedStatus.includes(status)){
        throw new Error(`Invalid status type`);
    }

    //checking if requestId is valid
    const result = await ConnectionRequest.findById(requestId);
    if(!result){
        throw new Error(`Invalid request`);
    }

    const connectionRequestPending = await ConnectionRequest.findOne({
        _id : requestId,
        toUserId : loggedInUserId,
        status : "intrested"
    })

    if(!connectionRequestPending){
        throw new Error(`No such request`)
    }

    connectionRequestPending.status = status;
    await connectionRequestPending.save();

    res.send(`Connection request ${status}`);

   }catch(err){
        res.send(`ERROR : ${err.message}`)
        console.log(err);
    }
})






module.exports = connectionRequestRouter;