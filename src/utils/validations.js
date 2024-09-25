const validator = require("validator");

function trimHere(str){
    return str.trim();
}


const validateSignUp = (req) =>{
    const {firstName,email,phoneNumber,password,age,gender,about} = req.body;
        if(firstName&&email&&phoneNumber&&password&&age&&gender&&about){
            let trimedFirstName = trimHere(firstName);
            let trimedEmail = trimHere(email);
            let trimedPhoneNumber = trimHere(phoneNumber);
            let trimedPassword = trimHere(password);
            let trimedAge = trimHere(age);
            let trimedGender = trimHere(gender);
            let trimedAbout = trimHere(about);
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
            }else if(!(trimedAbout.length > 0)){
                throw new Error(`Please enter something about yourself`);
            }
        }else{
            throw new Error(`All fields are required`)
        }
}


const validateLogin = (req) =>{
    const {email,password} = req.body;
    function trimHere(str){
        return str.trim();
    }
        let trimedEmail = trimHere(email);
        let trimedPassword = trimHere(password);
    
        if(!validator.isEmail(trimedEmail)){
            throw new Error(`Please enter valid e-mail`)
        }else if(!validator.isStrongPassword(trimedPassword)){
            throw new Error(`Password must contains alphanumeric and special characters and must be atleast 8-digits long`)
        }
}




const validateProfileEdit = (req) => {
    const {firstName, lastName, phoneNumber, age, gender, photoUrl, skills,about} = req.body;
    let userData = {};

    if (firstName) {
        let trimedFirstName = trimHere(firstName);
        if (trimedFirstName.length < 3) {
            throw new Error(`First name must be at least 3 characters long`);
        }
        userData.firstName = trimedFirstName;
    }

    if (lastName) {
        let trimedLastName = trimHere(lastName);
        if (trimedLastName.length < 3) {
            throw new Error(`Last name must be at least 3 characters long`);
        }
        userData.lastName = trimedLastName;
    }

    if (phoneNumber) {
        let trimedPhoneNumber = trimHere(phoneNumber);
        if (!validator.isMobilePhone(trimedPhoneNumber, 'any')) {
            throw new Error(`Please enter a valid phone number`);
        }
        userData.phoneNumber = trimedPhoneNumber;
    }

    // if (password) {
    //     let trimedPassword = trimHere(password);
    //     if (!validator.isStrongPassword(trimedPassword)) {
    //         throw new Error(`Password must contain alphanumeric and special characters, and must be at least 8 characters long`);
    //     }
    //     userData.password = trimedPassword;
    // }

    if (age) {
        let trimedAge = parseInt(trimHere(age), 10);
        if (trimedAge <= 18) {
            throw new Error(`You must be older than 18`);
        }
        userData.age = trimedAge;
    }

    if (gender) {
        let trimedGender = trimHere(gender);
        if (!["male", "female", "others"].includes(trimedGender.toLowerCase())) {
            throw new Error(`Please enter a valid gender`);
        }
        userData.gender = trimedGender;
    }

    if (photoUrl) {
        let trimedUrl = trimHere(photoUrl);
        if (!validator.isURL(trimedUrl)) {
            throw new Error(`Please enter a valid URL`);
        }
        userData.photoUrl = trimedUrl;
    }

    if (skills) {
        if (!Array.isArray(skills) || skills.length === 0) {
            throw new Error(`Please enter at least one skill`);
        }
        userData.skills = skills;
    }

    if (about) {
        let trimedAbout = trimHere(about);
        console.log("length " ,trimedAbout.length)
        if(trimedAbout.length < 0){
            throw new Error(`Please enter something about yourself`);
        }
        userData.about = trimedAbout;
    }

    return userData; 
};





module.exports = {validateSignUp, validateLogin, validateProfileEdit};