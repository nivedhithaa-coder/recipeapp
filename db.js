const mongoose = require('mongoose');
require('dotenv').config()
module.exports = () =>
  new Promise(async (resolve, reject) => {
    try {
      // Connect to MongoDB
      mongoose.set('strictQuery',false);
      const URL = process.env.MONGO_DB_STRING
      await mongoose.connect(URL);

      console.log('MongoDB Connected...');
      
      resolve(true);
    } catch (error) {
      console.log('MongoDB Connection Error: ', error);
      reject(error);
    }
  });