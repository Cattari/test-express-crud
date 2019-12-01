const request = require('supertest');
const { last } = require('lodash');

const app = require('../../server');
const { clearDb, runSeeds } = require('../../helpers');

describe('E2E Reviews actions', () => {
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
