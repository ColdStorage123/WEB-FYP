const uri = "mongodb+srv://fypcomsats123:comsats123@cluster0.gfpscra.mongodb.net/";
const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(process.env.mongo_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

