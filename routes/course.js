const express = require('express');
const { check, body } = require('express-validator/check');

const router = express.Router();

const Course = require("../models/course");

const courseController = require('../controllers/course');

// POST add a new course
// - Adding a validator middleware to validate all the data coming in thru the req
router.post(
    '/course', 
    [
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
    ], 
    courseController.postCourse
);

// GET all the courses a/c to query params 
//  - OR get all if none are specified
router.get('/courses', courseController.getAllCourses);

// GET course by id param
router.get('/course/:id', courseController.getCourseById);

// PUT update course by id
router.put('/course/:id',
    [
        body('Name').optional().isString()
            .custom((value, { req }) => {
                return Course.findOne({ Name: value }).then((userDoc) => {
                if (userDoc) {
                    return Promise.reject("Course Name Already Exists !");
                }
                });
            }),
        body('Type').optional().isIn(['beginner', 'intermediate', 'advance']),
        body('Duration').optional().isNumeric(),
        body('Price').optional().isNumeric(),
        body('Mrp').optional().isNumeric(),
        body('Discount').optional().isNumeric(),
        body('Rating').optional().isInt({ min: 1, max: 5 }),
        body('Category').optional().isIn(['programming','art','business']),
        body('Thumbnail').optional().isURL(),
        body('Demo').optional().isURL(),
        body('Partner').optional().isIn(['google','facebook','microsoft'])
    ],
    courseController.updateCourseById
 );


// GET all courses filtered by price min-max
// router.get('/courses', courseController.getCoursesSortedByPrice);

// GET all courses filtered by ratings 1-5
// router.get('/courses', courseController.getCoursesSortedByRatings);

// GET all courses filtered by programming/art/business
// router.get('/courses', courseController.getCoursesByCategory);

// GET all courses filtered by partner: google/facebook/microsoft
// router.get('/courses', courseController.getCourseByPartner);

module.exports = router;