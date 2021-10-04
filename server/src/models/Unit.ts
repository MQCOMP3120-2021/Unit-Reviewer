import mongoose, { Schema } from 'mongoose';
import { IUnit } from '../interfaces';
import { ReviewSchema } from './Review';

const UnitSchema = new Schema<IUnit>({
  code: String,             // Unit code - eg COMP1000
  name: String,             // Unit name - eg Introduction to Computer Programming
  description: String,      // Unit description - eg This unit is an introductory computer science unit...
  offerings: [String],      // List of offerings - eg ["S1", "S2", "S3"]
  rating: Number,           // Unit rating out of 10 - eg 4.5
  reviews: [ReviewSchema],  // List of unit reviews
});

export const Unit = mongoose.model('Unit', UnitSchema);
