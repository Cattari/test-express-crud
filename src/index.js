const swaggerUi = require('swagger-ui-express');

const app = require('./server');
const { getSwaggerSpec } = require('./helpers');
const { PORT } = require('./constants');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(getSwaggerSpec({ port: PORT })));

app.listen(PORT);

console.log(`Server started on ${PORT}`);
