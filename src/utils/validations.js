const validator = require("validator");

const validateSignUp = (req) =>{
    const {firstName,email,phoneNumber,password,age,gender} = req.body;
    function trimHere(str){
        return str.trim();
    }
        let trimedFirstName = trimHere(firstName);
        let trimedEmail = trimHere(email);
        let trimedPhoneNumber = trimHere(phoneNumber);
        let trimedPassword = trimHere(password);
        let trimedAge = trimHere(age);
        let trimedGender = trimHere(gender);
    
        if(!trimedFirstName.length >= 3){
            throw new Error(`First name must be of atleast 3 characters long`)
        }else if(!validator.isEmail(trimedEmail)){
            throw new Error(`Please enter valid e-mail`)
        }else if(!validator.isStrongPassword(trimedPassword)){
            throw new Error(`Password must contains alphanumeric and special characters and must be atleast 8-digits long`)
        }else if(!validator.isMobilePhone(trimedPhoneNumber, 'any')){
            throw new Error(`Please enter a valid Phone number`)
        }else if(!trimedAge >= 18){
            throw new Error(`You are not 18+`)
        }else if(!["male","female","others"].includes(trimedGender)){
            throw new Error(`Please enter valid gender`);
        }
}

module.exports = {validateSignUp};