const User = require('../models/schemas/Users.js');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const UserService = {

    getUser: async (data) => User.findOne(data),

    getUsername: async(user) => {
        const result = User.findOne(user);
        return result;
    },

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

    changePassword : async (userId, oldPassword, newPassword) => {
        
        try {
            const user = await UserService.getUser({_id: userId});
            const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

            
            bcrypt.compare(oldPassword, user.password, function(err, result) {
                console.log(result);
                if(result) {
                    user.password = hashedPassword;
                    return user.save();
                } else {
                    return 401;
                    console.log("message: 'Password does not match'");
                }
            });
        } catch(err) {
            throw err;
        }

    }
}


module.exports = UserService; 
