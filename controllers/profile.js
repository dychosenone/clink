// Import User Services and Bcrypt Encryption Plugin
const UserService = require('../service/user.js');
const bcrypt = require('bcrypt');

// Password Salt Encyrption Rounds
const SALT_ROUNDS = 10;

// Database Models
const db = require('../models/db');
const user = require('../models/schemas/Users');

// Profile Functions
var profile = {
    // Edit Profile
    editProfile: async (req, res) => {
        try {
            await UserService.updateUser(req.user._id, req.body);
            return res.status(204).send();
        } catch (err) {
            res.status(404).json({message: 'User not found!'});
        }

    },
    // Get Profile
    viewProfile: async (req, res) => {
        const userId = req.user._id;
        const user = await UserService.getUser({_id: userId});

        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            fullname: user.fullname,
            birthday: user.birthday,
            password: user.password, 
        });
    },
    // Get Username Only (For Recipe Reviews)
    getUsername : async(req, res) => {
        const userId = req.params.id;
        const result = await UserService.getUsername({_id : userId});
        console.log(result.username);

        res.status(200).json({username: result.username});
    },

    // Change Password Function
    changePassword : async (req, res) => {
        const newPassword = req.body.newpassword;
        const oldPassword = req.body.oldpassword;

        console.log(req.body.newpassword);

        try {
            const result = await UserService.changePassword(req.user._id, oldPassword, newPassword);

            if(result == 401) {
                res.status(401).send(result);
            }
            else {
                res.status(204).send(result);
            }

        } catch(err) {
            res.status(404).json({message: 'Cannot find user.'});
        }
        
    }

}

// Exports Function
module.exports = profile; 
