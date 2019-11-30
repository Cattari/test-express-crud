const main = require('express').Router({ mergeParams: true });
const { healthCheck } = require('../controllers/main');

main.get('/hc', healthCheck);

module.exports = main;