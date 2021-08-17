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
                        username: user.username,
                        fullname: user.fullname,
                        email: user.email,
                        birthday: user.birthday,
                        password: user.password, 
                    }

                    return res.status(200).json({
                        data: userDetails,
                        message: "Successfully Logged In!", 
                    });
                } else {
                    return res.status(400).json({
                        username: req.body.username,
                        passwordError: "Incorrect Password!",
                    });
                }
            });
        } else {
            return res.status(400).json({
                usernameError: "Username not found!"
            });
        }
    },
};

module.exports = login;