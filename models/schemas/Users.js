const mongoose = require('mongoose');

// User Database Structure
const UserSchema = new mongoose.Schema({

    username : {
        type: String,
        require: true
    },
    password : {
        type: String,
        require: true
    },
    fullname : {
        type: String, 
        require: true
    },
    email : { 
        type: String, 
        require: true
    },
    birthday : {
        type: String,
        require: true
    },
});

//Implement user schema
const UserModel = mongoose.model('User', UserSchema);

//Export 
module.exports = UserModel; 
