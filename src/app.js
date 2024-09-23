const express = require("express");


const app = express();


// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get("/user",(req,res)=>{
//     res.send('This is a user get')
// })


// app.post("/user",(req,res,next)=>{
//     let ans = req.body;
//     // console.log(ans);
//     res.send(ans);
//     next();
// },(req,res)=>{
//     console.log('2nd handler');
//     console.log(req.body);
//     res.send(`2nd handler`,req.body);
// })

// app.use("/", (req,res)=>{
//     res.send('This is /')
// })




//middlewares
// const {adminAuth,userAuth} = require("./middlewares/egAdminAuth.js");


// app.use("/admin", adminAuth);

// app.get("/admin", (req,res)=>{
//     res.send('Access granted')
// })




// app.post("/user/signup",(req,res,next)=>{
//     res.send("User signed up");
// })

// app.post("/user/login",(req,res,next)=>{
//     res.send("User logged in");
// })


// app.get("/user/profile",userAuth,(req,res,next)=>{
//     res.send("User profile sent");
// })







//error handling
// // app.use("/",(err,req,res,next)=>{
// //     console.log(`${err}  from middleware`)
// //     res.status(500).send(`Something went wrong1`);
// // })

// app.get("/user/data",userAuth,(req,res,next)=>{
//     // try{
//         throw new Error("Intentional Error");
//         res.send("User data sent");
//     // }catch(err){
//     //     res.status(500).send(`something went wrong`);
//     // }   
// })


// app.use("/",(err,req,res,next)=>{
//     console.log(`${err}  from middleware`)
//     res.status(500).send(`Something went wrong2`);
// })









// hardcoding
// app.post("/signup", async(req,res)=>{
//     let userData = {
//         firstName : 'Ishu',
//         lastName : 'Sinha',
//         email : 'srijansinha@gmail.com',
//         password : 'srijan123',
//         gender : 'male',
//         age : 23
//     }
// let user1 = new User(userData);
// try{
//     // throw new Error('error saving')
//     await user1.save();
//     res.send('user added to database');
// }catch(err){
//     res.status(400).send(`Error while saving user info`);
// }

// })



//dynamic
// app.post("/signup", async(req,res)=>{
//     let userX = new User(req.body);

//     try{
//         await userX.save();
//         console.log(`User added to Database`);
//         res.send(`User added to Database`);
//     }catch(err){
//         console.log(`error`, err);
//         console.log(`error sending data to datbase`);
//     }
// })



//get single user

// app.get("/findUser" , async(req,res)=>{
//     let userEmail = req.body.email;
//     try{
//         // throw new Error(`Intentional Error`)
//         let user = await User.findById({_id : "66eef8f0ccab000baa59d849"});
//         console.log(user);
//         if(user.length === 0 || user === null){
//             res.send(`User not found`);
//         }else{
//             res.send(user)
//         }
//     }catch(err){
//         res.send(`something went wrong`);
//     }
// })


// Database level operations 
const User = require("./models/user.js");
const {validateSignUp} = require("./utils/validations.js");

// 1. inserting
app.post("/user/signup", async(req,res)=>{
    let userData = req.body;
    // console.log(req.body);
    try{
        validateSignUp(req);
        let userX = new User(userData);
        await userX.save();
        res.send(`User data saved successfully`)
    }catch(err){
        res.send(`User data could not be saved.` + err);
        console.log(err);
    }
})

//reading all
app.get("/user/feed",async(req,res)=>{
    try{
        let userData = await User.find({});
        res.send(userData);
    }catch(err){
        res.status(500).send(`Something went wrong while getting the feed`);
        console.log(err);
    }
})

//reading based on email
app.post("/user/userinfo", async(req,res)=>{
    let userEmail = req.body.email;
    try{
        let result = await User.find({email : userEmail});
        if(result.length === 0){
            res.send(`No such user found`)
        }else{
            res.send(result);
        }
    }catch(err){
        res.status(500).send(`Something went wrong while getting the User`);
        console.log(`user email`,err);
    }
})

//update
app.patch("/user/update", async(req,res)=>{
    let userId = req.body._id;
    let updateValue = req.body;
    
        
    try{
        let allowedFields = ["_id" ,"firstName", "lastName", "phoneNumber", "password","age" ,"photoUrl"];
        const resultChange = Object.keys(updateValue).every((key)=> allowedFields.includes(key));
        // console.log(resultChange);
        if(!resultChange){
            throw new Error("Update Failed")
        }
        let result = await User.findByIdAndUpdate(userId, updateValue, {runValidators : true});
        console.log(result);
        res.send(`updated`);

    }catch(err){
        res.status(400).send(`Something went wrong while updating `+ err);
        console.log(`user info update`);
    }

})


//delete
app.delete("/user/delete", async(req,res)=>{
    let userId = req.body._id;
    try{
        await User.findByIdAndDelete(userId);
        res.send(`User deleted`);
    }catch(err){
        res.status(500).send(`Something went wrong while deleting user`);
        console.log(`user info update`,err);
    }
})













//starting the server if db connects
const connectDB = require("./config/Database.js");
connectDB().then(()=>{
    console.log(`Database connected`);
    app.listen(3000, ()=> console.log(`Server started successfully at port 3000`));
}).catch((err)=>{
    console.log(`Error while starting the server`, err);
})











