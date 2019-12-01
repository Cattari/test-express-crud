const request = require('supertest');
const { last } = require('lodash');

const app = require('../../server');
const { clearDb, runSeeds } = require('../../helpers');

describe('E2E Product actions', () => {
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

      productReviewsResponse = await request(app)
        .get(`/products/${newProductRecord.id}/reviews`)
        .set('Authorization', `Bearer ${token}`);

      expect(productReviewsResponse.statusCode).toEqual(200);
      expect(productReviewsResponse.body.data.length).toEqual(0);
    });
  });
});
