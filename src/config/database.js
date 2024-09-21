const mongoose = require("mongoose")
// console.log(mongoose.Schema);
const dbConnectionString = 'mongodb+srv://srijan122001:xtK4oshl7cpIQyKU@srijan.6nhyh.mongodb.net/devTinder';


async function connectDB(){
    await mongoose.connect(`${dbConnectionString}`);
}

module.exports = connectDB;