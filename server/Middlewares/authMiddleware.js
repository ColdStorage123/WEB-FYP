const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model("User");
require('dotenv').config();

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: "You must log in. Authorization header is missing" });
  }

  const token = authorization.replace("Bearer ", ""); // Remove the space after "Bearer"

  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    const _id = payload;

    const userdata = await User.findById(_id);

    if (!userdata) {
      return res.status(401).json({ error: "You must be logged in. User not found" });
    }

    req.user = userdata;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: "You must be logged in. Token has expired" });
    }
    return res.status(401).json({ error: "You must be logged in. Token is invalid" });
  }
};
