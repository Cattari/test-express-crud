const shortid = require('shortid');
const { db } = require('../db');

exports.findOne = params => db
  .get('users')
  .find(params)
  .value();

exports.addOne = data => db
  .get('users')
  .push({ id: shortid.generate(), ...data })
  .write();

exports.remove = (params = {}) => db
  .get('users')
  .remove(params)
  .write();

