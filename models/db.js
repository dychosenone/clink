const dotenv = require('dotenv-safe');
const mongoose = require('mongoose');

dotenv.config();

const config = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};

var database = {
  // Used to connect to the MongoDB Database
  connect : async () => {
    mongoose.connect(process.env.MONGO_URI, config, (error) => {
      if(error) {
        throw error;
      } else {
        console.log(`Connected to ${process.env.MONGO_URI}`);
      }
    });
  }

}

// Export Function
module.exports = database;