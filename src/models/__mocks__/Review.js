const { reviewItemMock } = require('../../mockData');

exports.getList = () => [reviewItemMock];
exports.findOne = () => reviewItemMock;
exports.addOne = data => ({ ...data, id: '1' });
exports.updateOne = ({ id }, data) => ({ id, ...data });
exports.remove = () => {};
