const { Strategy: JWTStrategy, ExtractJwt: ExtractJWT } = require('passport-jwt');
const { User } = require('../models');

const jwtStrategy = new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}, async (jwtPayload, cb) => {
  try {
    const user = await User.findOne({ id: jwtPayload.id });

    return cb(null, user);
  } catch (error) {
    return cb(error);
  }
});

module.exports = { jwtStrategy };
