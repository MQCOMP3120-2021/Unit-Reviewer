import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const initDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
  }

  await mongoose.connect(process.env.MONGO_URI);
};

export default initDB;
