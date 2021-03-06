const products = require('express').Router({ mergeParams: true });
const productsController = require('../controllers/products');

products.get('/', productsController.getList);
products.post('/', productsController.validate('addItem'), productsController.addItem);

products.get('/:productId', productsController.getItem);
products.put('/:productId', productsController.validate('changeItem'), productsController.changeItem);
products.delete('/:productId', productsController.removeItem);

products.get('/:productId/reviews', productsController.getProductReviews);

module.exports = products;