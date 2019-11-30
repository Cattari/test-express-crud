const shortid = require('shortid');
const { db } = require('../db');

exports.findOne = params => db
  .get('reviews')
  .find(params)
  .value();

exports.addOne = data => db
  .get('reviews')
  .push({ id: shortid.generate(), ...data })
  .write();

exports.updateOne = (params, data) => db
  .get('reviews')
  .find(params)
  .assign(data)
  .write();

exports.remove = params => db
  .get('reviews')
  .remove(params)
  .write();

exports.getList = (params = {}) => db
  .get('reviews')
  .filter(params)
  .value();
  