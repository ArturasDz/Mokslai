const { body } = require('express-validator');
const { getTourByName } = require('../models/tourModel');

const TourValidate = [
  body('name')
    .not().isEmpty()
    .withMessage('Name is required'),
  body('description')
    .not().isEmpty()
    .withMessage('Description is required'),
  body('category')
    .not().isEmpty()
    .withMessage('Category is required'),
  body('price')
    .not()
    .isEmpty()
    .isCurrency({ allow_negatives: false, digits_after_decimal: [2] })
    .withMessage('Price must be a positive decimal'), 
  body('duration')
    .not()
    .isEmpty()
    .isInt()
    .withMessage('Duration must be an integer'),
  body('difficulty')
    .not()
    .isEmpty()
    .isIn(['easy', 'medium', 'difficult'])
    .withMessage('Difficulty must be easy, medium or difficult'),
  body('name').custom(async (value) => {
    const name = await getTourByName(value);
    if (name) {
      throw new Error('Tour name already exists');
    }
    return true;
  }),
];

module.exports = TourValidate;
