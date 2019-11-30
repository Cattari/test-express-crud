const products = require('express').Router({ mergeParams: true });
const productsController = require('../controllers/products');
const reviewsRoutes = require('./reviews');

products.get('/', productsController.getList);
products.post('/', productsController.addItem);

products.get('/:productId', productsController.getItem);
products.put('/:productId', productsController.changeItem);
products.delete('/:productId', productsController.removeItem);

products.get('/:productId/reviews', productsController.getProductReviews);

module.exports = products;