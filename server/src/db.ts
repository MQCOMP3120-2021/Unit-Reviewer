import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const initDB = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@comp3120-cluster.fv0cu.`
      + 'mongodb.net/unit-reviewer?retryWrites=true&w=majority',
  );
};

export default initDB;
