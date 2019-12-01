const request = require('supertest');
const { last } = require('lodash');

const app = require('../../server');
const { clearDb, runSeeds } = require('../../helpers');

describe('E2E Healthcheck', () => {
  describe('healthcheck', () => {
    it('should work', async () => {
      const res = await request(app).get('/hc');

      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('message')
    });
  });

  describe('sign up a new user and login', () => {
    beforeAll(() => {
      clearDb();
      runSeeds();
    });

    afterAll(() => {
      clearDb();
    });

    it('should return a token for a new user', async () => {
      const userData = { username: 'admin1', password: 'qwerty2_secured' };
      const newUserRes = await request(app).post('/signup').send(userData);
      const loginRes = await request(app).post('/auth').send(userData);

      expect(loginRes.statusCode).toEqual(200)
      expect(loginRes.body).toHaveProperty('token')
    });
  });
});
