const { Review } = require('../models');

exports.getList = (req, res) => {
  try {
    const reviews = Review.getList(req.params);

    return res.json(reviews);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.getItem = (req, res) => {
  try {
    const { reviewId: id } = req.params;
    const reviewData = Review.findOne({ id });

    if (!reviewData) return res.json({ message: `Review with id ${id} not found` });

    return res.json(reviewData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.addItem = (req, res) => {
  try {
    Review.addOne(req.body);

    return res.json(req.body);
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

    return res.json(data);
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

