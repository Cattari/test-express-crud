const { check, validationResult } = require('express-validator');
const { Product, Review } = require('../models');
const { ABSTRACT_ERROR_TEXT } = require('../constants');

//@TODO Implement some sort of BaseController class (implement there getList, getItem ect.)
exports.getList = (req, res) => {
  try {
    const data = Product.getList();

    return res.json({ data });
  } catch (error) {
    console.log(error);
    res.status(500);
    return res.json({ message: ABSTRACT_ERROR_TEXT });
  }
};

exports.getItem = (req, res) => {
  try {
    const { productId: id } = req.params;
    const data = Product.findOne({ id });

    if (!data) {
      res.status(404);
      return res.json({ message: `Product with id ${id} not found` });
    }

    return res.json({ data });
  } catch (error) {
    console.log(error);
    res.status(500);
    return res.json({ message: ABSTRACT_ERROR_TEXT });
  }
};

exports.addItem = (req, res) => {
  try {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    const data = Product.addOne(req.body);

    return res.json({ data });
  } catch (error) {
    console.log(error);
    res.status(500);
    return res.json({ message: ABSTRACT_ERROR_TEXT });
  }
};

exports.changeItem = (req, res) => {
  try {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    const { productId: id } = req.params;
    const data = Product.updateOne({ id }, req.body);

    if (!data) {
      res.status(404);
      return res.json({ message: `Product with id ${id} not found` });
    }

    return res.json({ data });
  } catch (error) {
    console.log(error);
    res.status(500);
    return res.json({ message: ABSTRACT_ERROR_TEXT });
  }
};

exports.removeItem = (req, res) => {
  try {
    const { productId: id } = req.params;

    Product.remove({ id });

    return res.json({ message: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(500);
    return res.json({ message: ABSTRACT_ERROR_TEXT });
  }
};

exports.getProductReviews = (req, res) => {
  try {
    const { productId } = req.params;
    const data = Review.getList({ productId });

    return res.json({ data });
  } catch (error) {
    console.log(error);
    res.status(500);
    return res.json({ message: ABSTRACT_ERROR_TEXT });
  }
};

exports.validate = (method) => {
  const baseItemValidation = [ 
    check('name', 'Name can not be empty').isLength({ min: 1 }),
    check('price', 'Price can not be empty').isLength({ min: 1 }),
  ];

  switch (method) {
    case 'addItem':
      return baseItemValidation;
    case 'changeItem':
      return [ 
        check('id', 'Id can not be empty').isLength({ min: 1 }),
        ...baseItemValidation
      ]
  }
}