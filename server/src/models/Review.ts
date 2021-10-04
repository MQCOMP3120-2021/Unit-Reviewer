import mongoose from 'mongoose';

export const ReviewSchema = new mongoose.Schema({
  content: String, // The text content of the review
  rating: Number, // The rating of the unit out of 10 for this review
  author: String, // The username of the author of this review
  dateCreated: Date, // The date this review was received
});

export const Review = mongoose.model('Review', ReviewSchema);
