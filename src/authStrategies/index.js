const { localStrategy } = require('./local');
const { jwtStrategy } = require('./jwt');

module.exports = { localStrategy, jwtStrategy };