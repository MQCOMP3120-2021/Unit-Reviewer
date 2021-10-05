import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const initDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

export default initDB;
