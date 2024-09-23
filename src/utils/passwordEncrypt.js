const bcrypt = require("bcrypt");

function hashPassword(password){
    let hashed = bcrypt.hash(password,10);
    return hashed;
}

module.exports = hashPassword;