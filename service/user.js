const User = require('../models/schemas/Users.js');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const UserService = {

    // Gets one specific user
    getUser: async (data) => User.findOne(data),

    // Gets the username
    getUsername: async(user) => {
        const result = User.findOne(user);
        return result;
    },

    // Adds a user to the database
    addUser: async (user) => {
        const newUser = new User({
            username: user.username,
            fullname: user.fullname,
            email: user.email,
            birthday: user.birthday,
            password: user.password,
        }); 

        return newUser.save();
    },
    
    // Updates a users credentials
    updateUser: async (userId, data) => {
        try {

            const user = await UserService.getUser({_id: userId});
            

            if(data.fullname !== '') {
                user.fullname = data.fullname; 
            }
        
            if(data.email !== '') {
                user.email = data.email; 
            }
        
            if(data.birthday !== '') {
                user.birthday = data.birthday; 
            }
        
            return user.save();
        } catch (err) {
            throw err; 
        }
    },


    // Changes the user's current password
    changePassword : async (userId, oldPassword, newPassword) => {
        
        try {
            const user = await UserService.getUser({_id: userId});
            const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

            if (newPassword !== '') {
                user.password = hashedPassword;
            }

            return user.save();

        } catch(err) {
            throw err;
        }

    }
}

// Exports Function
module.exports = UserService; 
