const adminAuth = (req,res,next)=>{
    console.log(`Auth is running`);
    let token = "xy";
    let isAutherised = token === "xyz";
    if(!isAutherised){
        res.status(401).send('Admin not autherised');
    }else{
        next();
    } 
}


const userAuth = (req,res,next)=>{
    console.log(`User is running`);
    let token = "xyz";
    let isAutherised = token === "xyz";
    if(!isAutherised){
        res.status(401).send('User not autherised');
    }else{
        next();
    } 
}

module.exports = {adminAuth,userAuth}