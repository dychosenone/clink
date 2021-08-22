const UserService = require('../service/user.js');
const bcrypt = require('bcrypt');

const db = require('../models/db');
const user = require('../models/schemas/Users');

var login = {

    postLogin : async (req, res) => {

        const username = req.body.username; 
        const password = req.body.password; 

        const user = await UserService.getUser({username: username});
        if(user != null) {
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

                    req.session.userId = user._id;
                    console.log(req.session.userId);

                    return res.status(200).json({
                        userId : req.session.userId,
                        message: "Successfully Logged In!", 
                    });
                } else {
                    return res.status(400).json({
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

    logout : async (req, res) => {
        req.session.destroy((error) => {
            if(error == true) {
                throw error;
            }
            res.status(200).json({
                message: "Successfully logged out."
            });
        });
    }
};

module.exports = login;