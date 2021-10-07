import { Schema } from 'mongoose';

import { IAssessment } from '../interfaces';

export default new Schema<IAssessment>({
  title: String,
  description: String,
  hurdle: Boolean,
  type: String,
  weighting: Number,
});
