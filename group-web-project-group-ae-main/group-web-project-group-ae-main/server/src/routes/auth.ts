import express from 'express';
import jwt from 'express-jwt';
import { sign } from 'jsonwebtoken';

import { JWT_COOKIE_NAME, JWT_SECRET } from '../config';
import { IUser } from '../interfaces';
import { addUser, passwordValid, userExists } from '../models/User';

const authRouter = express.Router();

const CANNOT_ADD_USER_ERROR = 'Unable to add user';
const USER_EXISTS_ERROR = 'User already exists';
const USER_DOES_NOT_EXIST_ERROR = 'User does not exist';
const INVALID_PASSWORD_ERROR = 'Password is invalid';

export const getToken = (req: express.Request) => {
  if (req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');

    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        return credentials;
      }
    }
  } else if (req.cookies) {
    return req.cookies[JWT_COOKIE_NAME];
  }

  return null;
};

/**
 * A User type
 * @typedef {object} User
 * @property {string} username.required - The user's username
 */

/**
 * A AuthenticationDetails type
 * @typedef {object} AuthenticationDetails
 * @property {string} username.required - The user's username
 * @property {string} password.required - The user's password
 */

/**
 * GET /api/auth/me
 * @summary Returns the current users details
 * @return {User} 200 - Success response
 * @return {object} 400 - Bad request
 */
authRouter.get(
  '/me',
  jwt({ secret: JWT_SECRET, algorithms: ['HS512'], getToken }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const user: IUser = req.user as IUser;
    return res.status(200).json({ username: user.username });
  },
);

/**
 * POST /api/auth/register
 * @summary Registers the given user
 * @param {AuthenticationDetails} request.body.required - User info
 * @return {User} 200 - The saved user
 */
authRouter.post('/register', async (req, res) => {
  const { username } = req.body;
  const { password } = req.body;

  if (await userExists(username)) {
    return res.status(400).json({ error: USER_EXISTS_ERROR });
  }

  try {
    await addUser(username, password);

    const token = sign({ username }, JWT_SECRET, {
      expiresIn: '1h',
      algorithm: 'HS512',
    });

    return res.status(200).cookie(JWT_COOKIE_NAME, token).json({ username });
  } catch (error) {
    return res.status(400).send({ error: CANNOT_ADD_USER_ERROR });
  }
});

/**
 * POST /api/auth/login
 * @summary Authenticates the given user
 * @param {AuthenticationDetails} request.body.required - User info
 * @return {User} 200 - The user
 */
authRouter.post('/login', async (req, res) => {
  const { username } = req.body;
  const { password } = req.body;

  const exists = await userExists(username);
  if (!exists) {
    return res.status(400).json({ error: USER_DOES_NOT_EXIST_ERROR });
  }
  if (await passwordValid(username, password)) {
    const token = sign({ username }, JWT_SECRET, {
      expiresIn: '1h',
      algorithm: 'HS512',
    });

    return res.status(200).cookie(JWT_COOKIE_NAME, token).json({ username });
  }

  return res.status(400).json({ error: INVALID_PASSWORD_ERROR });
});

export default authRouter;
