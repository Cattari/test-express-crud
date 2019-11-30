const passport = require('passport');
const jwt = require('jsonwebtoken');
const { omit } = require('lodash');

const { User } = require('../models');
const { sha1 } = require('../utils');

module.exports.login = (req, res) => {
  
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {     
      return res.status(400).json(err);
    }

    req.login(user, { session: false }, (err) => {
      if (err) return res.send(err);

      const token = jwt.sign(user, process.env.JWT_SECRET);

      return res.json({ user: omit(user, 'password'), token });
    });
  })(req, res);
};

module.exports.signUp = (req, res) => {
  try {
    User.addOne({ ...req.body, password: sha1(req.body.password) });

    return res.json(omit(req.body, 'password'));
  } catch (error) {
    console.log(error); //@TODO use winston or other logging tool
    return res.status(500).json({ message: 'Something bad happened' });
  }
};

