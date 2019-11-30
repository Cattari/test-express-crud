require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');

const routes = require('./routes');
const authStrategies = require('./authStrategies');

passport.use('local', authStrategies.localStrategy);
passport.use('jwt', authStrategies.jwtStrategy);

app.use(bodyParser.json());
app.use('/', routes);

module.exports = app; 
