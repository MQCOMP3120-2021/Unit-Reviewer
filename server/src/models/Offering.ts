import { Schema } from 'mongoose';

import { IOffering } from '../interfaces';

export default new Schema<IOffering>({
  attendance: String,
  location: String,
  period: String,
});
