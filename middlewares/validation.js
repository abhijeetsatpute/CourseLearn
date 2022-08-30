const { body } = require('express-validator/check');

const validatorMiddleware = [
    body('Name').isString()
        .custom((value, { req }) => {
            return Course.findOne({ Name: value }).then((userDoc) => {
              if (userDoc) {
                return Promise.reject("Course Name Already Exists !");
              }
            });
        }),
    body('Type').isIn(['beginner', 'intermediate', 'advance']),
    body('Duration').isNumeric(),
    body('Price').isNumeric(),
    body('Mrp').isNumeric(),
    body('Discount').isNumeric(),
    body('Rating').isInt({ min: 1, max: 5 }),
    body('Category').isIn(['programming','art','business']),
    body('Thumbnail').isURL(),
    body('Demo').isURL(),
    body('Partner').isIn(['google','facebook','microsoft'])
];

module.exports = validatorMiddleware;