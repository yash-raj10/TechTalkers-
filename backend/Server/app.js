const express =  require('express');
const morgan = require('morgan');
const cron = require('node-cron');
const colors = require('colors')
const app = express();
const dotenv = require('dotenv');
app.use(express.json());
app.use(morgan('dev'));
const mongoose = require('mongoose');

dotenv.config();

const connectDB = async() =>{ 
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB server connected to ${mongoose.connection.host}`.bgCyan.black);
    } catch (error) {
        console.log(`MongoDB server issue: ${error}`.bgRed.black);
    }
}

connectDB();

const scheduledTask = cron.schedule('0 */4 * * *', () => {
    deleteCFP();
    fetchAndStoreEvents();
  }, {
    scheduled: true,
    timezone: 'America/New_York' 
  });
  
  
  scheduledTask.start();

  app.use('/api/v1/public',require('../Api-Routes/publicRoutes'));

   
  
  const port = process.env.PORT
  
   
  app.listen(port,()=>{
      console.log(`server is running in ${process.env.DEV_MODE} mode on port ${process.env.PORT}`.bgGreen.bgWhite);
  }); 