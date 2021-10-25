import { Schema } from 'mongoose';

export default new Schema({
  content: String,
  rating: Number,
  author: String,
  dateCreated: Number, // The date this review was received
  unitId: String,
});
