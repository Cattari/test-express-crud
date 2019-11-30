require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');

const routes = require('./routes');
const authStrategies = require('./authStrategies');
const { getSwaggerSpec } = require('./helpers');

const port = process.env.PORT || 8080;   

passport.use('local', authStrategies.localStrategy);
passport.use('jwt', authStrategies.jwtStrategy);

app.use(bodyParser.json());
app.use('/', routes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(getSwaggerSpec({ port })));

app.listen(port);

console.log(`Server started on ${port}`);