// Import User Services and Bcrypt Encryption Plugin
const UserService = require('../service/user.js');
const bcrypt = require('bcrypt');

// Password Salt Encyrption Rounds
const saltRounds = 10;

const { Mongoose } = require('mongoose');
const db = require('../models/db');
const user = require('../models/schemas/Users');

// Register Functions
var register = {

    postRegister: async (req, res) => {
        const username = req.body.username;
        const fullname = req.body.fullname;
        const email = req.body.email;
        const birthday = req.body.birthday;
        const password = req.body.password;

        const userDetails = await UserService.getUser({username: username});
        const emailDetails = await UserService.getUser({email: email});

        // Emaill CLeaning
        const validEmailAt = req.body.email.split('@');
        const validEmailDot = req.body.email.split('.');

        // Database Validation
        if(userDetails != null) {
            return res.status(400).json({
                message: "Username already exists",
            });
        } else if (emailDetails != null) {
            return res.status(400).json({
                message: "E-mail already exists", 
            });
        } else if (validEmailAt.length < 2 || validEmailDot.length < 2) {
            return res.status(400).json({
                message: "E-mail does not follow valid format", 
            });
        } else { 
            const newUser = {
                username: req.body.username,
                fullname: req.body.fullname,
                email: req.body.email,
                birthday: req.body.birthday,
                password: req.body.password,
            };
            // Password Encryption
            newUser.password = await bcrypt.hash(req.body.password, saltRounds);
            const result = await UserService.addUser(newUser);

            return res.status(201).json({
                    message: "Successfully Registered",
                    username: newUser.username,
            });
        }
        
    },

}

module.exports = register;