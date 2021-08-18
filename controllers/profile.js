const UserService = require('../service/user.js');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const db = require('../models/db');
const user = require('../models/schemas/Users');

var profile = {

    editProfile: async (req, res) => {
        try {
            await UserService.updateUser(req.session.userId, req.body);
            return res.status(204).send();
        } catch (err) {
            res.status(404).json({message: 'User not found!'});
        }

    },

    viewProfile: async (req, res) => {
        const userId = req.session.userId;
        const user = await UserService.getUser({_id: userId});

        res.status(200).json(user);
    },

    changePassword : async (req, res) => {
        const newPassword = req.body.newPassword;
        const oldPassword = req.body.oldPassword;

        try {
            const result = await UserService.changePassword(req.session.userId, oldPassword, newPassword);
            return res.status(204).send(result);
        } catch(err) {
            res.status(404).json({message: 'Cannot find user.'});
        }
        
    }

}

module.exports = profile; 
