const { Product } = require('../models');

exports.getList = (req, res) => {
  try {
    const data = Product.getList();

    return res.json({ data });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.getItem = (req, res) => {
  try {
    const { productId: id } = req.params;
    const data = Product.findOne({ id });

    if (!data) return res.json({ message: `Product with id ${id} not found` });

    return res.json({ data });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.addItem = (req, res) => {
  try {
    Product.addOne(req.body);

    return res.json({ data: req.body });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.changeItem = (req, res) => {
  try {
    const { productId: id } = req.params;
    const data = Product.updateOne({ id }, req.body);

    if (!data) return res.json({ message: `Product with id ${id} not found` });

    return res.json({ data });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.removeItem = (req, res) => {
  try {
    const { productId: id } = req.params;

    Product.remove({ id });

    return res.json({ message: 'Success' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.getProductReviews = (req, res) => {
  try {
    const { productId } = req.params;
    const data = Review.getList({ productId });

    return res.json({ data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
