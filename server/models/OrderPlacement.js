const mongoose = require('mongoose');

const orderPlacementSchema = new mongoose.Schema({ 
  farmerId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming userId is a string, adjust the type if it's different
    required: true,
  },
  managerid: {
    type: mongoose.Schema.Types.ObjectId, // Assuming userId is a string, adjust the type if it's different
    required: true,
  },
 farmerEmail: {
    type: String, // Assuming farmerEmail is a string, adjust the type if it's different
    required: true,
  }, 

  cropQuantity: {
    type: String,
    required: true,
  },
  selectedStartDate: {
    type: Date,
    required: true,
  },
  storageDays: {
    type: String,
    required: true,
  },
  userRequirements: {
    type: String,
    required: true,
  },
  selectedEndDate: {
    type: Date,
    required: true,
  },

  images: {
    type: [String], // Array of image URLs
    default: [],    // Default to an empty array
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
    default: 'pending',
  },
});

const OrderPlacement = mongoose.model('OrderPlacement', orderPlacementSchema);

module.exports = OrderPlacement; 
