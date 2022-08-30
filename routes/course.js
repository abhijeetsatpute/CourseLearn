const express = require('express');
const { check, body } = require('express-validator/check');

const router = express.Router();

const Course = require("../models/course");

const courseController = require('../controllers/course');

// POST add a new course
// - Adding a validator middleware to validate all the data coming in thru the req
router.post(
    '/course', 
    courseController.validate('postCourse'), 
    courseController.postCourse
);

// GET all the courses a/c to query params 
//  - OR get all if none are specified
router.get('/courses', courseController.getAllCourses);

// GET course by id param
router.get('/course/:id', courseController.getCourseById);

// PUT update course by id
router.put(
    '/course/:id',
    courseController.validate('updateCourseById'),
    courseController.updateCourseById
);

// DELETE course by id
router.delete(
    '/course/:id',
    courseController.deleteCourseById
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