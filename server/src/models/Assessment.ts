import { Schema } from 'mongoose';

import { IAssessment } from '../interfaces';

export default new Schema<IAssessment>({
  name: String,
  weight: Number,
});
