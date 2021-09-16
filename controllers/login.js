// Import User Services and Bcrypt Encryption Plugin
const UserService = require('../service/user.js');
const bcrypt = require('bcrypt');

// Database Models
const db = require('../models/db');
const user = require('../models/schemas/Users');

// Import JSON Authentication File
const token = require('../middlewares/auth.js');

// Login Functions
var login = {
    // Main Login Function
    postLogin : async (req, res) => {

        const username = req.body.username; 
        const password = req.body.password; 

        const user = await UserService.getUser({username: username});
        if(user != null) {
            // Compares encrpyted password
            bcrypt.compare(password, user.password, function(err, result){
                if(result)  {
                    const userDetails = {
                        _id : user._id,
                        username: user.username,
                        fullname: user.fullname,
                        email: user.email,
                        birthday: user.birthday,
                        password: user.password, 
                    }
                    // Creates a JSON Access Token
                    const accessToken = token.generateAccessToken(userDetails);
                    return res.status(200).json({
                        id: user._id,
                        accessToken: accessToken, 
                        message: "Successfully Logged In!"
                    });
                } else {
                    return res.status(401).json({
                        message: "Incorrect Password!",
                    });
                }
            });
        } else {
            return res.status(400).json({
                message: "Username not found!"
            });
        }
    },

};

module.exports = login;