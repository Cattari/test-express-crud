const swaggerJSDoc = require('swagger-jsdoc');

exports.getSwaggerSpec = (options) => swaggerJSDoc({
  openapi: '3.0.0',
  swagger: '2.0',
  swaggerDefinition: {
    info: {
      title: 'Product API',
      version: '1.0.0',
      description: 'A simple product API',
    },
    host: `localhost:${options.port}`,
    basePath: '/',
  },
  /**
   * This approach allows us to keep code clean and docs distributed well-readable
   */
  apis: [
    './docs/**/*.yaml',
  ],
}); 
