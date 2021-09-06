const UserService = require('../service/user.js');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const db = require('../models/db');
const user = require('../models/schemas/Users');

var profile = {

    editProfile: async (req, res) => {
        try {
            await UserService.updateUser(req.user._id, req.body);
            return res.status(204).send();
        } catch (err) {
            res.status(404).json({message: 'User not found!'});
        }

    },

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

    changePassword : async (req, res) => {
        const newPassword = req.body.newpassword;
        const oldPassword = req.body.oldpassword;

        try {
            const result = await UserService.changePassword(req.user._id, oldPassword, newPassword);

            if(result == 401) {
                return res.status(401).send(result);
            }
            else {
                return res.status(204).send(result);
            }

        } catch(err) {
            res.status(404).json({message: 'Cannot find user.'});
        }
        
    }

}

module.exports = profile; 
