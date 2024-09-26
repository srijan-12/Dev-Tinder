const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    status : {
        type : String,
        required : true,
        enum : {
            values : ["ignored", "intrested", "accepted", "rejected"],
            message : `{VALUES} is of incorrect status type`
        }
    }

},{
    timestamps : true
})


connectionSchema.index({fromUserId: 1, toUserId: 1})

connectionSchema.pre("save", function(next){
    const connection = this;
    if(connection.fromUserId.equals(connection.toUserId)){
        throw new Error(`You cannot send request to yourself`);
    }
    next();
})


const ConnectionRequest = mongoose.model("ConnectionRequest", connectionSchema);
module.exports = ConnectionRequest;