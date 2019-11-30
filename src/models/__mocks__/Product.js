const { productItemMock } = require('../../mockData');

exports.getList = () => [productItemMock];
exports.findOne = () => productItemMock;
exports.addOne = data => ({ ...data, id: '1' });
exports.updateOne = ({ id }, data) => ({ id, ...data });
exports.remove = () => {};
