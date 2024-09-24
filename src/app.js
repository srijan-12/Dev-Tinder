const express = require("express");

const connectDB = require("./config/database.js");
const app = express();
app.use(express.json());


const authRouter = require("./Routes/authRoutes.js");



app.use("/", authRouter);


connectDB().then(()=>{
    console.log(`Database connected`);
    app.listen(3000, ()=>{
        console.log(`Server started at port 3000`);
    })
}).catch((err)=>{
    console.log(err.message);
})


console.log('check')