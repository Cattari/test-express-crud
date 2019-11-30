const express = require('express');
const auth = express.Router({ mergeParams: true });   
const userController = require('../controllers/users');

auth.post('/auth', userController.validate('login'), userController.login);
auth.post('/signup', userController.validate('signUp'), userController.signUp);

module.exports = auth;
