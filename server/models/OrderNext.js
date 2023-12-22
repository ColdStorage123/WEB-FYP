const mongoose = require('mongoose');

const nextPageSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order', // Reference to the Order model if needed
    required: true,
  },
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order', // Reference to the Order model if needed
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  requiredDays: {
    type: Number,
    required: true,
  },
  offeredAmount: {
    type: Number,
    required: true,
  },
});

const NextPageModel = mongoose.model('NextPage', nextPageSchema);

module.exports = NextPageModel;
