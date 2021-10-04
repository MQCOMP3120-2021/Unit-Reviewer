import bcrypt from 'bcrypt';
import mongoose, { Schema } from 'mongoose';

import { SALT_ROUNDS } from '../config';
import { IUser } from '../interfaces';

const UserSchema = new Schema<IUser>({
  username: String, // User's username
  passwordHash: String, // Hash of the users password
  dateCreated: Date, // Date the user was created
});

export const User = mongoose.model('User', UserSchema);

export const addUser = async (username: string, password: string) => {
  const passwordHash = bcrypt.hashSync(password, SALT_ROUNDS);

  await User.create({
    username,
    passwordHash,
  });
};

export const passwordValid = async (username: string, password: string) => {
  const user = await User.findOne({ username });

  if (!user) {
    return false;
  }

  return bcrypt.compareSync(password, user.passwordHash);
};

export const userExists = async (username: string) => {
  const user: mongoose.Document | null = await User.findOne({ username });
  return user !== null;
};
