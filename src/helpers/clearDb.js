const { db } = require('../db');

exports.clearDb = () => {
  db.setState({});
}
