const mongoose = require('mongoose');

const coldStorageSchema = new mongoose.Schema({
  managerid: {
    type: mongoose.Schema.Types.ObjectId,  
    required: true,
  },  
  randomID: {
    type: Number,
    unique: true, // Ensures that the randomID is unique in the database
  },
  coldStorageName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  capacity: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'cancelled'],
    default: 'pending',
  },
  transitionId: {
    type: String,  
  },
 price: {
    type: String,  
  },
  images: [{ type: String }],
});

const ColdStorage = mongoose.model('ColdStorage', coldStorageSchema);

module.exports = ColdStorage;
