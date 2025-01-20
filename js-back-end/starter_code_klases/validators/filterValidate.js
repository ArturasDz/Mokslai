const { query } = require('express-validator');
const { getDifficultyById } = require('../models/tourModel');

const filterValidator = [
  query('duration')
    .optional()
    .isInt({ min: 1 })
    .withMessage('duration must be a positive integer')
    .toInt(),
  query('difficulty')
    .optional()
    .isIn(['Easy', 'Medium', 'Difficult'])
    .withMessage('difficulty must be Easy, Medium or Difficult')
    .toInt(),
  query('price')
    .optional()
    .isCurrency({ allow_negatives: false, digits_after_decimal: [2] })
    .withMessage('Price must be a positive decimal'), // error message
  query('sort')
    .isIn('ASC', 'DESC')
    .withMessage(['sort must be ASC or DESC'])
    .toInt(),
    query('difficulty')
    .custom(async (value) => {
        const difficulty = await getDifficultyById(value);
        if (!difficulty) {
          throw new Error('Invalid difficulty ID, not found in difficulty table');
        }
        return true;
      }),
];
module.exports = filterValidator;
