const validator = require("validator");

// Utility function to safely trim input
function trimHere(str) {
    if (typeof str === "string") {
        return str.trim();
    }
    return str; // Return the value as-is if it's not a string
}

// Validation for Sign-Up
const validateSignUp = (req) => {
    const { firstName, email, phoneNumber, password, age, gender, about } = req.body;

    if (!firstName || !email || !phoneNumber || !password || !age || !gender || !about) {
        throw new Error(`All fields are required`);
    }

    const trimedFirstName = trimHere(firstName);
    const trimedEmail = trimHere(email);
    const trimedPhoneNumber = trimHere(phoneNumber);
    const trimedPassword = trimHere(password);
    const trimedAge = Number(trimHere(age)); // Ensure age is treated as a number
    const trimedGender = trimHere(gender);
    const trimedAbout = trimHere(about);

    if (trimedFirstName.length < 3) {
        throw new Error(`First name must be at least 3 characters long`);
    }

    if (!validator.isEmail(trimedEmail)) {
        throw new Error(`Please enter a valid email`);
    }

    if (!validator.isStrongPassword(trimedPassword)) {
        throw new Error(
            `Password must contain alphanumeric characters, special characters, and be at least 8 characters long`
        );
    }

    if (!validator.isMobilePhone(trimedPhoneNumber, "any")) {
        throw new Error(`Please enter a valid phone number`);
    }

    if (trimedAge < 18) {
        throw new Error(`You must be at least 18 years old`);
    }

    if (!["male", "female", "others"].includes(trimedGender.toLowerCase())) {
        throw new Error(`Please enter a valid gender`);
    }

    if (trimedAbout.length === 0) {
        throw new Error(`Please enter something about yourself`);
    }
};

// Validation for Login
const validateLogin = (req) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new Error(`Email and password are required`);
    }

    const trimedEmail = trimHere(email);
    const trimedPassword = trimHere(password);

    if (!validator.isEmail(trimedEmail)) {
        throw new Error(`Please enter a valid email`);
    }

    if (!validator.isStrongPassword(trimedPassword)) {
        throw new Error(
            `Password must contain alphanumeric characters, special characters, and be at least 8 characters long`
        );
    }
};

// Validation for Profile Edit
const validateProfileEdit = (req) => {
    try{
        const { firstName, lastName, phoneNumber, age, gender, photoUrl, skills, about } = req.body;
    let userData = {};

    if (firstName) {
        const trimedFirstName = trimHere(firstName);
        if (trimedFirstName.length < 3) {
            throw new Error(`First name must be at least 3 characters long`);
        }
        userData.firstName = trimedFirstName;
    }

    if (lastName) {
        const trimedLastName = trimHere(lastName);
        if (trimedLastName.length < 3) {
            throw new Error(`Last name must be at least 3 characters long`);
        }
        userData.lastName = trimedLastName;
    }

    if (phoneNumber) {
        const trimedPhoneNumber = trimHere(phoneNumber.toString()); // Convert to string
        if (!validator.isMobilePhone(trimedPhoneNumber, "any")) {
            throw new Error(`Please enter a valid phone number`);
        }
        userData.phoneNumber = trimedPhoneNumber;
    }
    

    if (age) {
        const parsedAge = Number(trimHere(age)); // Ensure age is treated as a number
        if (isNaN(parsedAge) || parsedAge <= 18) {
            throw new Error(`You must be older than 18`);
        }
        userData.age = parsedAge;
    }

    if (gender) {
        const trimedGender = trimHere(gender);
        if (!["male", "female", "others"].includes(trimedGender.toLowerCase())) {
            throw new Error(`Please enter a valid gender`);
        }
        userData.gender = trimedGender;
    }

    if (photoUrl) {
        const trimedUrl = trimHere(photoUrl);
        if (!validator.isURL(trimedUrl)) {
            throw new Error(`Please enter a valid URL`);
        }
        userData.photoUrl = trimedUrl;
    }

    if (skills) {
        if (!Array.isArray(skills)) {
            throw new Error(`Skills must be an array`);
        }
        if (skills.length === 0) {
            throw new Error(`Please enter at least one skill`);
        }
        userData.skills = skills;
    }

    if (about) {
        const trimedAbout = trimHere(about);
        if (trimedAbout.length === 0) {
            throw new Error(`Please enter something about yourself`);
        }
        userData.about = trimedAbout;
    }

    return userData;
    }catch(err){
        return err.message;
    }
};

module.exports = { validateSignUp, validateLogin, validateProfileEdit };
