import mongoose, { Schema } from 'mongoose';

import { IUnit } from '../interfaces';
import { AssessmentSchema } from './Assessment';
import { ReviewSchema } from './Review';

const UnitSchema = new Schema<IUnit>({
  code: String, // Unit code - eg COMP1000
  title: String, // Unit name - eg Introduction to Computer Programming
  // Unit description - eg This unit is an introductory computer science unit...
  description: String,
  offerings: [String], // List of offerings - eg ["S1", "S2", "S3"]
  scheduledActivities: [String], // List of scheduled activities - eg ["Lecture", "Tutorial"]
  nonScheduledActivities: [String], // List of non-scheduled activities - eg ["Lab"]
  assessments: [AssessmentSchema], // List of assessments - eg [ObjectId]
  credits: Number, // Number of credit points - eg 10
  department: String, // Department name - eg Computing
  faculty: String, // Faculty name - eg Faculty of Science and Engineering
  group: String, // Group name - eg Software Engineering
  level: String, // Level name - eg Undergraduate
  prerequisites: [String], // List of prerequisites - eg ["COMP1000", "COMP1001"]
  nccw: [String], // List of NCCW codes - eg ["COMP1000", "COMP1001"]
  outcomes: [String], // List of outcomes - eg ["Objective 1", "Objective 2"]
  rating: Number, // Unit rating out of 10 - eg 4.5
  reviews: [ReviewSchema], // List of unit reviews
});

// assessments: [{ type: Schema.Types.ObjectId, ref: 'Assessment' }], // List of assessments - eg
// [ObjectId];

const Unit = mongoose.model('Unit', UnitSchema);

export default Unit;
