const shortid = require('shortid');
const { db } = require('../db');

exports.findOne = params => db
  .get('products')
  .find(params)
  .value();

exports.addOne = data => db
  .get('products')
  .push({ ...data, id: shortid.generate() })
  .write();

exports.updateOne = (params, data) => db
  .get('products')
  .find(params)
  .assign(data)
  .write();

exports.remove = (params = {}) => db
  .get('products')
  .remove(params)
  .write();

exports.getList = (params = {}) => db
  .get('products')
  .filter(params)
  .value();
