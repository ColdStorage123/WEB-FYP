/* const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model("User");
const cors = require('cors');

require('dotenv').config();
const corsOptions = {
  origin: 'http://localhost:3001', // Replace with your frontend's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: "You must login, key not given" });
  }
  
  const token = authorization.replace("Bearer ", ""); // Remove the space after "Bearer"
  
  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "You must be logged in, token invalid" });
    }
    
    const _id = payload;
    
    User.findById(_id).then(userdata => {
      req.user = userdata;
      next();
    });
  });
}; */
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model("User");
require('dotenv').config();

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: "You must login, key not given" });
  }
  
  const token = authorization.replace("Bearer ", ""); // Remove the space after "Bearer"
  
  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "You must be logged in, token invalid" });
    }
    
    const _id = payload;
    
    User.findById(_id).then(userdata => {
      req.user = userdata;
      next();
    });
  });
};
