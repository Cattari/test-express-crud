jest.mock('../../models/Product');
jest.mock('../../models/Review');
const productsController = require('../products');
const { productItemMock, reviewItemMock } = require('../../mockData');
const { Product, Review } = require('../../models');
const { ABSTRACT_ERROR_TEXT } = require('../../constants');

describe('Prooducts Controller', () => {
  describe('getList', () => {
    describe('success case', () => {
      const spy = jest.fn();

      productsController.getList({}, { json: spy });

      it('should return productsList response', () => {
        expect(spy).toHaveBeenCalledWith({ data: [productItemMock] });
      });
    });

    describe('failure case', () => {
      const spyResponseJson = jest.fn();
      const spyResponseStatus = jest.fn();

      let mockFn

      beforeAll(() => {
        mockFn = jest.spyOn(Product, 'getList').mockImplementation(() => {
          throw new Error('Boom');
        });
        productsController.getList({}, { json: spyResponseJson, status: spyResponseStatus });
      });

      afterAll(() => {
        mockFn.restore();
      })

      it('should set 500 status to the response', () => {
        expect(spyResponseStatus).toHaveBeenCalledWith(500);
      });

      it('should return error text', () => {
        expect(spyResponseJson).toHaveBeenCalledWith({ message: ABSTRACT_ERROR_TEXT });
      });
    });
    
  });

  describe('getItem', () => {
    describe('success case', () => {
      const spy = jest.fn();

      productsController.getItem({ params: { productId: 2 } }, { json: spy });

      it('should return product item response', () => {
        expect(spy).toHaveBeenCalledWith({ data: productItemMock });
      });
    });

    describe('failure case', () => {
      const spyResponseJson = jest.fn();
      const spyResponseStatus = jest.fn();

      let mockFn

      beforeAll(() => {
        mockFn = jest.spyOn(Product, 'findOne').mockImplementation(() => {
          throw new Error('Boom');
        });
        productsController.getItem({ params: { productId: 2 } }, { json: spyResponseJson, status: spyResponseStatus });
      });

      afterAll(() => {
        mockFn.restore();
      })

      it('should set 500 status to the response', () => {
        expect(spyResponseStatus).toHaveBeenCalledWith(500);
      });

      it('should return error text', () => {
        expect(spyResponseJson).toHaveBeenCalledWith({ message: ABSTRACT_ERROR_TEXT });
      });
    });

    describe('product not found', () => {
      const spyResponseJson = jest.fn();
      const spyResponseStatus = jest.fn();

      let mockFn

      beforeAll(() => {
        mockFn = jest.spyOn(Product, 'findOne').mockImplementation(() => null);
        productsController.getItem(
          { params: { productId: '2' },body: productItemMock }, 
          { json: spyResponseJson, status: spyResponseStatus }
        );
      });

      afterAll(() => {
        mockFn.restore();
      })

      it('should set 404 status to the response', () => {
        expect(spyResponseStatus).toHaveBeenCalledWith(404);
      });

      it('should return error text', () => {
        expect(spyResponseJson).toHaveBeenCalledWith({ message: 'Product with id 2 not found' });
      });
    });
  });

  describe('addItem', () => {
    describe('success case', () => {
      const spy = jest.fn();

      productsController.addItem({ body: productItemMock }, { json: spy });

      it('should return product item response', () => {
        expect(spy).toHaveBeenCalledWith({ data: { ...productItemMock, id: '1' } });
      });
    });

    describe('failure case', () => {
      const spyResponseJson = jest.fn();
      const spyResponseStatus = jest.fn();

      let mockFn

      beforeAll(() => {
        mockFn = jest.spyOn(Product, 'addOne').mockImplementation(() => {
          throw new Error('Boom');
        });
        productsController.addItem({ body: productItemMock }, { json: spyResponseJson, status: spyResponseStatus });
      });

      afterAll(() => {
        mockFn.restore();
      })

      it('should set 500 status to the response', () => {
        expect(spyResponseStatus).toHaveBeenCalledWith(500);
      });

      it('should return error text', () => {
        expect(spyResponseJson).toHaveBeenCalledWith({ message: ABSTRACT_ERROR_TEXT });
      });
    });
  });

  describe('changeItem', () => {
    describe('success case', () => {
      const spy = jest.fn();

      productsController.changeItem({ params: { productId: '2' }, body: productItemMock }, { json: spy });

      it('should return product item response', () => {
        expect(spy).toHaveBeenCalledWith({ data: productItemMock });
      });
    });

    describe('some error happened', () => {
      const spyResponseJson = jest.fn();
      const spyResponseStatus = jest.fn();

      let mockFn

      beforeAll(() => {
        mockFn = jest.spyOn(Product, 'updateOne').mockImplementation(() => {
          throw new Error('Boom');
        });
        productsController.changeItem(
          { params: { productId: '2' },body: productItemMock }, 
          { json: spyResponseJson, status: spyResponseStatus }
        );
      });

      afterAll(() => {
        mockFn.restore();
      })

      it('should set 500 status to the response', () => {
        expect(spyResponseStatus).toHaveBeenCalledWith(500);
      });

      it('should return error text', () => {
        expect(spyResponseJson).toHaveBeenCalledWith({ message: ABSTRACT_ERROR_TEXT });
      });
    });

    describe('product not found', () => {
      const spyResponseJson = jest.fn();
      const spyResponseStatus = jest.fn();

      let mockFn

      beforeAll(() => {
        mockFn = jest.spyOn(Product, 'updateOne').mockImplementation(() => null);
        productsController.changeItem(
          { params: { productId: '2' },body: productItemMock }, 
          { json: spyResponseJson, status: spyResponseStatus }
        );
      });

      afterAll(() => {
        mockFn.restore();
      })

      it('should set 404 status to the response', () => {
        expect(spyResponseStatus).toHaveBeenCalledWith(404);
      });

      it('should return error text', () => {
        expect(spyResponseJson).toHaveBeenCalledWith({ message: 'Product with id 2 not found' });
      });
    });
  });

  describe('removeItem', () => {
    describe('success case', () => {
      const spy = jest.fn();

      productsController.removeItem({ params: { productId: '2' } }, { json: spy });

      it('should return success response', () => {
        expect(spy).toHaveBeenCalledWith({ message: 'Success' });
      });
    });

    describe('failure case', () => {
      const spyResponseJson = jest.fn();
      const spyResponseStatus = jest.fn();

      let mockFn

      beforeAll(() => {
        mockFn = jest.spyOn(Product, 'remove').mockImplementation(() => {
          throw new Error('Boom');
        });
        productsController.removeItem(
          { params: { productId: '2' } }, 
          { json: spyResponseJson, status: spyResponseStatus }
        );
      });

      afterAll(() => {
        mockFn.restore();
      })

      it('should set 500 status to the response', () => {
        expect(spyResponseStatus).toHaveBeenCalledWith(500);
      });

      it('should return error text', () => {
        expect(spyResponseJson).toHaveBeenCalledWith({ message: ABSTRACT_ERROR_TEXT });
      });
    });
  });

  describe('getProductReviews', () => {
    describe('success case', () => {
      const spy = jest.fn();

      productsController.getProductReviews({ params: { productId: '2' } }, { json: spy });

      it('should return product item response', () => {
        expect(spy).toHaveBeenCalledWith({ data: [reviewItemMock] });
      });
    });

    describe('failure case', () => {
      const spyResponseJson = jest.fn();
      const spyResponseStatus = jest.fn();

      let mockFn

      beforeAll(() => {
        mockFn = jest.spyOn(Review, 'getList').mockImplementation(() => {
          throw new Error('Boom');
        });
        productsController.getProductReviews(
          { params: { productId: '2' } }, 
          { json: spyResponseJson, status: spyResponseStatus }
        );
      });

      afterAll(() => {
        mockFn.restore();
      })

      it('should set 500 status to the response', () => {
        expect(spyResponseStatus).toHaveBeenCalledWith(500);
      });

      it('should return error text', () => {
        expect(spyResponseJson).toHaveBeenCalledWith({ message: ABSTRACT_ERROR_TEXT });
      });
    });
  });
});
