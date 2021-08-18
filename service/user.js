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
    },
    
    updateUser: async (data) => {
        try {
            //const user = await UserService.getUser({_id: data.session.userId});
            const user = await UserService.getUser({username: data.body.username});
            console.log(user);
            const { username, fullname, email, birthday, password, confirmpassword } = data.body; 
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS); 

            console.log(data.body.password);
            console.log(data.body.confirmpassword);

            if(fullname !== '') {
                user.fullname = fullname; 
            }
        
            if(email !== '') {
                user.email = email; 
            }
        
            if(birthday !== '') {
                user.birthday = birthday; 
            }
        
            if(password !== '') {
                user.password = password; 
            }
            
            return user.save();
        } catch (err) {
            throw err; 
        }
    }, 
}


module.exports = UserService; 
