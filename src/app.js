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








const User = require("./models/user.js");
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
app.post("/signup", async(req,res)=>{
    let userX = new User(req.body);

    try{
        await userX.save();
        console.log(`User added to Database`);
        res.send(`User added to Database`);
    }catch(err){
        console.log(`error`, err);
        console.log(`error sending data to datbase`);
    }
})



















const connectDB = require("./config/database.js");
connectDB().then(()=>{
    console.log(`Database connected successfully`);
    app.listen(3000 , ()=>{
        console.log(`Server is up and running at port 3000`)
    })
})
.catch((err)=>{
    console.log(`Database could not be connected, ${err}`);
})









