const dotenv = require('dotenv-safe');
const jwt = require('jsonwebtoken');

dotenv.config();

const token = {
    // checks if token is valid then returns the current user data payload
    authenticateToken: (req, res, next) => {
      // get token
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
  
      // if token does not exist, current user is not logged in
      if (token == null || typeof token === 'undefined') {
        return res.status(401).json({ message: 'Not Logged In!' });
      }
  
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        // if token is not verified, thus not a valid token
        if (err) {
          // user is forbidden from accessing the page or resource
          return res
            .status(403)
            .json({ message: 'Forbidden / Unauthorized Request!' });
        }
  
        // get username
        req.user = user;

        console.log(user._id);
  
        // move to next route function
        next();
      });
    },
  
    // create token for the current user
    generateAccessToken: (data) => {
      // generate access token given the data
      const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
  
      // return the generated access token
      return accessToken;
    },
};
  
  // export token middleware
  module.exports = token;
  