const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8, // Minimum password length validation
    maxlength: 60, // Maximum password length validation
  },
  confirmPassword: {
    type: String,
    required: true,
    minlength: 8, // Minimum password length validation
    maxlength: 60,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Farmer', 'Manager', 'Admin'],
    default: 'Farmer',
  },
  /* role: {
    type: String, // Adjust the type accordingly (String, Enum, etc.)
    default: 'Farmer', // Set the default role if needed
  }, */
  resetPasswordCode: {
    type: String,
    default: null,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

// Encrypting user password before saving to the database using bcrypt

  userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
      return next();
    }
  
    // Check if the password meets the minimum and maximum length requirements
    if (user.password.length < 8 || user.password.length > 60) {
      const err = new Error('Password must be between 8 and 60 characters long');
      return next(err);
    }
  
    // Encrypt password
    user.password = await bcrypt.hash(user.password, 10);
    user.confirmPassword = user.password;
    next();
  });

userSchema.methods.generateAuthToken = async function () {
  try {
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
  } catch (err) {
        console.log(err);
  }
}
const User = mongoose.model('User', userSchema);

module.exports = User; 