import mongoose, { Schema } from 'mongoose';

import { IAssessment } from '../interfaces';

export const AssessmentSchema = new Schema<IAssessment>({
  name: String,
  weight: Number,
});

const Assessment = mongoose.model('Assessment', AssessmentSchema);

export default Assessment;
