const { getSwaggerSpec } = require('./getSwaggerSpec');
const { clearDb } = require('./clearDb');
const { runSeeds } = require('./runSeeds');

module.exports = { getSwaggerSpec, runSeeds, clearDb };
