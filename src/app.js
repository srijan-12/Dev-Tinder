const express = require("express");


const app = express();


// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

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









