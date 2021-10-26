import bcrypt from 'bcrypt';
import mongoose, { Schema } from 'mongoose';

import { SALT_ROUNDS } from '../config';
import { IReview, IUser } from '../interfaces';
import ReviewSchema from './Review';

const UserSchema = new Schema<IUser>({
  // User's username
  username: {
    type: String,
    minlength: 1,
  },
  admin: Boolean, // Wether a user is admin or not
  passwordHash: String, // Hash of the users password
  dateCreated: Date, // Date the user was created
  reviews: {
    type: [ReviewSchema], // List of unit reviews
    required: false,
  },
});

const User = mongoose.model('User', UserSchema);

export const addUser = async (username: string, password: string, admin: boolean) => {
  const passwordHash = bcrypt.hashSync(password, SALT_ROUNDS);

  await User.create({
    username,
    admin,
    passwordHash,
    dateCreated: Date.now(),
    reviews: [],
  });
};

export const removeUser = async (username: string) => {
  await User.findOneAndDelete({ username });
};

export const passwordValid = async (username: string, password: string) => {
  const user = await User.findOne({ username });

  if (!user) {
    return false;
  }

  return bcrypt.compareSync(password, user.passwordHash);
};

export const checkAdmin = async (username: string) => {
  const user = await User.findOne({ username });

  if (!user) {
    return false;
  }

  return user.admin;
};

export const checkReviews = async (username: string) => {
  const user = await User.findOne({ username });

  if (!user) {
    return false;
  }

  if (!user.reviews) {
    return false;
  }

  return user.reviews;
};

export const setAdmin = async (username: string, admin: boolean) => User.findOneAndUpdate(
  { username }, { admin },
);

export const addUserReview = async (userId: string, review: IReview) => User.findByIdAndUpdate(
  userId, { $push: { reviews: review } },
);

export const deleteUserReview = async (
  userId: string,
  reviewId: string,
) => User.findByIdAndUpdate(userId, {
  $pull: { reviews: { _id: reviewId } },
});

export const userExists = async (username: string) => {
  const user: mongoose.Document | null = await User.findOne({ username });
  return user !== null;
};

export default User;
