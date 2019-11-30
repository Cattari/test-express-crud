const { Review } = require('../models');

exports.getList = (req, res) => {
  try {
    const data = Review.getList(req.params);

    return res.json({ data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.getItem = (req, res) => {
  try {
    const { reviewId: id } = req.params;
    const data = Review.findOne({ id });

    if (!data) return res.json({ message: `Review with id ${id} not found` });

    return res.json({ data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.addItem = (req, res) => {
  try {
    const data = Review.addOne(req.body);

    return res.json({ data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.changeItem = (req, res) => {
  try {
    const { reviewId: id } = req.params;
    const data = Review.updateOne({ id }, req.body);

    if (!data) return res.json({ message: `Review with id ${id} not found` });

    return res.json({ data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.removeItem = (req, res) => {
  try {
    const { reviewId: id } = req.params;

    Review.remove({ id });

    return res.json({ message: 'Success' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

