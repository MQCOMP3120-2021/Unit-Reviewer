/* eslint-disable no-undef */

import { addUser, removeUser, userExists } from '../src/models/User';
import requestWithSupertest from './index';

const USERNAME = 'test';
const UNIQUE_USERNAME = 'W9ZpV8fKdgkgCR2geZ4EsTf5zKxY';
const PASSWORD = 'password';

describe('Auth Endpoints', () => {
  describe('Auth Register Endpoint', () => {
    it('POST /auth/register should register a valid user', async () => {
      const res = await requestWithSupertest.post('/api/auth/register').send({ username: USERNAME, password: PASSWORD });

      expect(res.status).toEqual(200);
    });

    it('POST /auth/register should not register a user that already exists', async () => {
      const res = await requestWithSupertest.post('/api/auth/register').send({ username: USERNAME, password: PASSWORD });

      expect(res.status).toEqual(400);
      expect(res.body).toEqual({ error: 'User already exists' });
    });

    it('POST /auth/register should not allow a blank username', async () => {
      const res = await requestWithSupertest.post('/api/auth/register').send({ username: '', password: PASSWORD });

      expect(res.status).toEqual(400);
      expect(res.body).toEqual({ error: 'Username or password cannot be empty' });
      expect(await userExists('')).toBe(false);
    });

    it('POST /auth/register should not allow a blank password', async () => {
      const res = await requestWithSupertest.post('/api/auth/register').send({ username: UNIQUE_USERNAME, password: '' });

      expect(res.status).toEqual(400);
      expect(res.body).toEqual({ error: 'Username or password cannot be empty' });
      expect(await userExists(UNIQUE_USERNAME)).toBe(false);
    });

    afterAll(async () => {
      await removeUser(USERNAME);
      await removeUser(UNIQUE_USERNAME);
      await removeUser('');
    });
  });

  describe('Auth Login Endpoint', () => {
    beforeAll(async () => {
      await addUser(USERNAME, PASSWORD, false);
    });

    it('POST /auth/login should log in as an existing user', async () => {
      const res = await requestWithSupertest.post('/api/auth/login').send({ username: USERNAME, password: PASSWORD });

      expect(res.status).toEqual(200);
    });

    it('POST /auth/login should not log in with an incorrect password', async () => {
      const res = await requestWithSupertest.post('/api/auth/login').send({ username: USERNAME, password: 'bad' });

      expect(res.status).toEqual(400);
      expect(res.body).toEqual({ error: 'Incorrect username or password' });
    });

    it('POST /auth/login should not log in with a user that does not exist', async () => {
      const res = await requestWithSupertest.post('/api/auth/login').send({ username: UNIQUE_USERNAME, password: PASSWORD });

      expect(res.status).toEqual(400);
      expect(res.body).toEqual({ error: 'Incorrect username or password' });
    });

    afterAll(async () => {
      await removeUser(USERNAME);
      await removeUser(UNIQUE_USERNAME);
    });
  });

  describe('Auth Me Endpoint', () => {
    beforeAll(async () => {
      await addUser(USERNAME, PASSWORD, false);
    });

    it('GET /auth/me should return the logged in user info', async () => {
      const tokenRes = await requestWithSupertest.post('/api/auth/login').send({ username: USERNAME, password: PASSWORD });
      const cookies = tokenRes.headers['set-cookie'][0];
      const res = await requestWithSupertest.get('/api/auth/me').set('Cookie', cookies);

      expect(res.status).toEqual(200);
      expect(res.body.username).toEqual(USERNAME);
    });

    it('GET /auth/me should not return info if the user is not logged in', async () => {
      const res = await requestWithSupertest.get('/api/auth/me');

      expect(res.status).toEqual(401);
      expect(res.body).toEqual({});
    });

    afterAll(async () => {
      await removeUser(USERNAME);
    });
  });
});
