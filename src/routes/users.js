const express = require('express');
const auth = express.Router({ mergeParams: true });   
const { login, signUp } = require('../controllers/users');

auth.post('/auth', login);
auth.post('/signup', signUp);

module.exports = auth;
