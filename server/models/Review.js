const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    managerid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    fullName: {
      type: String, // Assuming the full name is a string
      required: true,
  }
  });
  

  const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
  