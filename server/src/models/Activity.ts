import { Schema } from 'mongoose';

import { IActivity } from '../interfaces';

export default new Schema<IActivity>({
  description: String,
  name: String,
  offerings: [String],
});
