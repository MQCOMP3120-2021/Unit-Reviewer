import mongoose, { Schema } from 'mongoose';

import { UNIT_SEARCH_INDEX } from '../config';
import { IReview, IUnit } from '../interfaces';
import ActivitiesSchema from './Activities';
import AssessmentSchema from './Assessment';
import OfferingSchema from './Offering';
import ReviewSchema from './Review';

const UnitSchema = new Schema<IUnit>({
  code: String, // Unit code - eg COMP1000
  title: String, // Unit name - eg Introduction to Computer Programming
  // Unit description - eg This unit is an introductory computer science unit...
  description: { type: String, required: false },
  // List of offerings - eg [{attendance: String, location: String, period: String}]
  offerings: { type: [OfferingSchema], required: false },
  activities: {
    type: ActivitiesSchema, // Schedule and nonScheduled acitivities
    required: false,
  },
  assessments: {
    type: [AssessmentSchema], // List of assessments - eg [{ name: String, weight: Number }]
    required: false,
  },
  credits: {
    type: Number, // Number of credit points - eg 10
    required: false,
  },
  department: {
    type: String, // Department name - eg Computing
    required: false,
  },
  faculty: {
    type: String, // Faculty name - eg Faculty of Science and Engineering
    required: false,
  },
  group: {
    type: String, // Group name - eg Software Engineering
    required: false,
  },
  level: {
    type: String, // Level name - eg Undergraduate
    required: false,
  },
  prerequisites: {
    type: [String], // List of prerequisites - eg ["COMP1000", "COMP1001"]
    required: false,
  },
  nccw: {
    type: [String], // List of NCCW codes - eg ["COMP1000", "COMP1001"]
    required: false,
  },
  outcomes: {
    type: [String], // List of outcomes - eg ["Objective 1", "Objective 2"]
    required: false,
  },
  rating: {
    type: Number, // Unit rating out of 10 - eg 4.5
    required: false,
  },
  reviews: {
    type: [ReviewSchema], // List of unit reviews
    required: false,
  },
});

const Unit = mongoose.model('Unit', UnitSchema);

export const addUnit = async (unit: IUnit) => new Unit(
  unit,
).save();

export const deleteUnit = async (unitId: string) => Unit.findByIdAndDelete(unitId);

export const deleteAllUnits = async () => Unit.deleteMany({});

export const addReview = async (unitId: string, review: IReview) => Unit.findByIdAndUpdate(
  unitId, { $push: { reviews: review } },
);

export const getUnit = async (unitId: string) => Unit.findOne(
  { _id: unitId },
);

export const deleteReview = async (
  unitId: string,
  reviewId: string,
) => Unit.findByIdAndUpdate(unitId, {
  $pull: { reviews: { _id: reviewId } },
});

export const searchUnits = async (query: string, path: string) => Unit.aggregate().search({
  index: UNIT_SEARCH_INDEX,
  wildcard: {
    path,
    query: `*${query}*`,
    allowAnalyzedField: true,
  },
  // text: {
  //   query,
  //   path,
  //   fuzzy: {},
  //   // {
  //   //   wildcard: '*',
  //   // },
  // },
});

export default Unit;
