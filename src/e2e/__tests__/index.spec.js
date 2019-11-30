const request = require('supertest');
const { last } = require('lodash');

const app = require('../../server');
const { clearDb, runSeeds } = require('../../helpers');

describe('E2E Product actions', () => {
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

  describe('product CRUD workflow', () => {
    beforeAll(() => {
      clearDb();
      runSeeds();
    });

    afterAll(() => {
      clearDb();
    });

    it('should successfully add a new product then update it then delete it', async () => {
      const userData = { username: 'admin', password: 'qwerty_secured' };
      const loginRes = await request(app).post('/auth').send(userData);
      const { token } = loginRes.body;
      const newProductInitData = { name: 'T-Shirt', price: 150 };

      let productsListResponse = { body: { data: [] } };

      const newProductResponse = await request(app)
        .post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send(newProductInitData);

      const newProductRecord = last(newProductResponse.body.data);

      productsListResponse = await request(app)
        .get('/products')
        .set('Authorization', `Bearer ${token}`);

      expect(newProductResponse.statusCode).toEqual(200);
      expect(newProductRecord).toMatchObject(newProductInitData);

      await request(app)
        .put(`/products/${newProductRecord.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Pants' });
      productsListResponse = await request(app)
        .get('/products')
        .set('Authorization', `Bearer ${token}`);

      expect(productsListResponse.statusCode).toEqual(200);
      expect(last(productsListResponse.body.data)).toEqual({
        ...newProductRecord,
        name: 'Pants'
      });

      await request(app)
        .delete(`/products/${newProductRecord.id}`)
        .set('Authorization', `Bearer ${token}`);
      
      productsListResponse = await request(app)
        .get('/products')
        .set('Authorization', `Bearer ${token}`);

      expect(productsListResponse.statusCode).toEqual(200);
      expect(last(productsListResponse.body.data)).not.toEqual({
        ...newProductRecord,
        name: 'Pants'
      });
    });
  });

  describe('reviews CRUD workflow', () => {
    beforeAll(() => {
      clearDb();
      runSeeds();
    });

    afterAll(() => {
      clearDb();
    });

    it('should successfully add a new review then update it then delete it', async () => {
      const userData = { username: 'admin', password: 'qwerty_secured' };
      const loginRes = await request(app).post('/auth').send(userData);
      const { token } = loginRes.body;
      const newReviewInitData = { productId: '1', content: 'Here is a 3-star review', author: 'Max Smith', };

      let reviewsListResponse = { body: { data: [] } };

      const newReviewResponse = await request(app)
        .post('/reviews')
        .set('Authorization', `Bearer ${token}`)
        .send(newReviewInitData);

      const newReviewRecord = last(newReviewResponse.body.data);

      reviewsListResponse = await request(app)
        .get('/products/1/reviews')
        .set('Authorization', `Bearer ${token}`);

      expect(newReviewResponse.statusCode).toEqual(200);
      expect(newReviewRecord).toMatchObject(newReviewInitData);

      await request(app)
        .put(`/reviews/${newReviewRecord.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ author: 'John Smith' });
      reviewsListResponse = await request(app)
        .get('/products/1/reviews')
        .set('Authorization', `Bearer ${token}`);

      expect(reviewsListResponse.statusCode).toEqual(200);
      expect(last(reviewsListResponse.body.data)).toEqual({
        ...newReviewRecord,
        author: 'John Smith'
      });

      await request(app)
        .delete(`/reviews/${newReviewRecord.id}`)
        .set('Authorization', `Bearer ${token}`);
      
      reviewsListResponse = await request(app)
        .get('/products/1/reviews')
        .set('Authorization', `Bearer ${token}`);

      expect(reviewsListResponse.statusCode).toEqual(200);
      expect(last(reviewsListResponse.body.data)).not.toEqual({
        ...newReviewRecord,
        name: 'Pants'
      });
    });
  });
});
