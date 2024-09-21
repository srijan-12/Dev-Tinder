const mongoose = require("mongoose")
const dbConnectionString = 'mongodb+srv://srijan122001:xtK4oshl7cpIQyKU@srijan.6nhyh.mongodb.net';


async function connectDB(){
    await mongoose.connect(`${dbConnectionString}`);
}

module.exports = connectDB;