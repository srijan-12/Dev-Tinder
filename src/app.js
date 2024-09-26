const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database.js");
const app = express();
app.use(express.json());
app.use(cookieParser())

const authRouter = require("./Routes/authRoutes.js");
const profileRouter = require("./Routes/profileRoutes.js");
const connectionRequestRouter = require("./Routes/connectionRequestRouter.js");
const userRouter = require("./Routes/user.js");


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", connectionRequestRouter);
app.use("/", userRouter);
connectDB().then(()=>{
    console.log(`Database connected`);
    app.listen(3000, ()=>{
        console.log(`Server started at port 3000`);
    })
}).catch((err)=>{
    console.log(err.message);
})