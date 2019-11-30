const LocalStrategy = require('passport-local').Strategy;

const { User } = require('../models');
const { sha1 } = require('../utils');

const checkAuth = (username, password, done) => {
  try {
    const user = User.findOne({ username });
  
    if (!user) return done({ message: 'Incorrect username' });

    if (sha1(password) !== user.password) {
      return done({ message: 'Incorrect password' });
    }

    return done(null, user, {});
  } catch (error) {
    return done(error);
  }
}

const localStrategy = new LocalStrategy(checkAuth);

module.exports = { localStrategy, checkAuth };
