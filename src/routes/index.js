const router = require('express').Router();  
const passport = require('passport');

const users = require('./users');
const main = require('./main');
const products = require('./products');
const reviews = require('./reviews');

router.use('/', [users, main]);
router.use('/products', passport.authenticate('jwt', { session: false }), products);
router.use('/reviews', passport.authenticate('jwt', { session: false }), reviews);

module.exports = router;
