import express from 'express';
import jwt from 'express-jwt';
import { sign } from 'jsonwebtoken';

import { JWT_COOKIE_NAME, JWT_SECRET } from '../config';
import { IUser } from '../interfaces';
import {
  addUser, checkAdmin, checkReviews, passwordValid, setAdmin, userExists,
} from '../models/User';

const authRouter = express.Router();

const CANNOT_ADD_USER_ERROR = 'Unable to add user';
const USER_EXISTS_ERROR = 'User already exists';
const BAD_LOGIN_ERROR = 'Incorrect username or password';
const EMPTY_USERNAME_OR_PASSWORD_ERROR = 'Username or password cannot be empty';

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
    return res.status(200).json({
      username: user.username,
      admin: user.admin,
      reviews: user.reviews,
    });
  },
);

/**
 * POST /api/auth/register
 * @summary Registers the given user
 * @param {AuthenticationDetails} request.body.required - User info
 * @return {User} 200 - The saved user
 */
authRouter.post('/register', async (req, res) => {
  const { username, password } = req.body as { username: string, password: string };

  if (username.length === 0 || password.length === 0) {
    return res.status(400).json({ error: EMPTY_USERNAME_OR_PASSWORD_ERROR });
  }

  if (await userExists(username)) {
    return res.status(400).json({ error: USER_EXISTS_ERROR });
  }

  try {
    await addUser(username, password, false);

    const token = sign({ username }, JWT_SECRET, {
      expiresIn: '1h',
      algorithm: 'HS512',
    });

    return res.status(200).cookie(JWT_COOKIE_NAME, token).send();
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
    return res.status(400).json({ error: BAD_LOGIN_ERROR });
  }
  if (await passwordValid(username, password)) {
    const isAdmin = await checkAdmin(username);
    const hasReviews = await checkReviews(username);

    const token = sign({ username, admin: isAdmin, reviews: hasReviews }, JWT_SECRET, {
      expiresIn: '1h',
      algorithm: 'HS512',
    });

    return res.status(200).cookie(JWT_COOKIE_NAME, token).send();
  }

  return res.status(400).json({ error: BAD_LOGIN_ERROR });
});

/**
 * POST /api/auth/makeAdmin
 * @summary Makes the given user admin
 * @param {User} request.body.required - User info
 * @return {object} 200 - Success response
 */
authRouter.post('/makeAdmin', async (req, res) => {
  const { username } = req.body;

  const exists = await userExists(username);
  if (!exists) {
    return res.status(400).json({ error: BAD_LOGIN_ERROR });
  }

  await setAdmin(username, true);
  const hasReviews = await checkReviews(username);

  const token = sign({ username, admin: true, reviews: hasReviews }, JWT_SECRET, {
    expiresIn: '1h',
    algorithm: 'HS512',
  });

  return res.status(200).cookie(JWT_COOKIE_NAME, token).send();
});

/**
 * POST /api/auth/revokeAdmin
 * @summary Revokes admin privileges from the given user
 * @param {User} request.body.required - User info
 * @return {object} 200 - Success response
 */
authRouter.post('/revokeAdmin', async (req, res) => {
  const { username } = req.body;

  const exists = await userExists(username);
  if (!exists) {
    return res.status(400).json({ error: BAD_LOGIN_ERROR });
  }

  await setAdmin(username, false);
  const hasReviews = await checkReviews(username);

  const token = sign({ username, admin: false, reviews: hasReviews }, JWT_SECRET, {
    expiresIn: '1h',
    algorithm: 'HS512',
  });

  return res.status(200).cookie(JWT_COOKIE_NAME, token).send();
});

authRouter.post(
  '/logout',
  jwt({ secret: JWT_SECRET, algorithms: ['HS512'], getToken }),
  async (req, res) => {
    res.clearCookie(JWT_COOKIE_NAME);
    return res.redirect('/');
  },
);

export default authRouter;
