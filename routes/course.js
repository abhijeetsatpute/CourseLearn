const express = require('express');

const router = express.Router();

const courseController = require('../controllers/course');

// POST add a new course
router.post('/course', courseController.postCourse);

// GET all the courses a/c to query params 
//  - OR get all if none are specified
router.get('/courses', courseController.getAllCourses);

// GET course by id param
router.get('/course/:id', courseController.getCourseById);



// GET all courses filtered by price min-max
// router.get('/courses', courseController.getCoursesSortedByPrice);

// GET all courses filtered by ratings 1-5
// router.get('/courses', courseController.getCoursesSortedByRatings);

// GET all courses filtered by programming/art/business
// router.get('/courses', courseController.getCoursesByCategory);

// GET all courses filtered by partner: google/facebook/microsoft
// router.get('/courses', courseController.getCourseByPartner);

module.exports = router;