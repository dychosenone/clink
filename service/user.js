const User = require('../models/schemas/Users.js');

const UserService = {

    getUser: async (data) => User.findOne(data),

    addUser: async (user) => {
        const newUser = new User({
            username: user.username,
            fullname: user.fullname,
            email: user.email,
            birthday: user.birthday,
            password: user.password,
        }); 

        return newUser.save();
    }
}


module.exports = UserService; 