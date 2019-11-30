const reviews = require('express').Router({ mergeParams: true });
const reviewsController = require('../controllers/reviews');

reviews.get('/', reviewsController.getList);
reviews.post('/', reviewsController.validate('addItem'), reviewsController.addItem);

reviews.get('/:reviewId', reviewsController.getItem);
reviews.put('/:reviewId', reviewsController.validate('changeItem'), reviewsController.changeItem);
reviews.delete('/:reviewId', reviewsController.removeItem);

module.exports = reviews;