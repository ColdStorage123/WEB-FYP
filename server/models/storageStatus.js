const mongoose = require('mongoose');

const storageStatusSchema = new mongoose.Schema({
  coldStorageName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Accepted', 'Rejected'],
    default: 'Pending',
  },
  description: {
    type: String,
  },
    capacity: {
    type: String,
    required: true,
  },
   location: {
    type: String,
    required: true,
  },
    status:  {
    type: String,
   
  },
});

const StorageStatus = mongoose.model('StorageStatus', storageStatusSchema);

module.exports = StorageStatus;
/*  
const coldStorageSchema = new mongoose.Schema({
  coldStorageName: String,
  description: String,
  capacity: Number,
  location: String,
  phoneNumber: String,
  status: String, // 'Pending', 'Accepted', or 'Rejected'
});

const ColdStorage = mongoose.model('ColdStorage', coldStorageSchema); */