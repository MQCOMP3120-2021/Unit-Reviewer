import { Schema } from 'mongoose';

import { IActivities } from '../interfaces';
import ActivitySchema from './Activity';

export default new Schema<IActivities>({
  scheduled: [ActivitySchema],
  nonScheduled: [ActivitySchema],
});
