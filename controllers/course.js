const Course = require('../models/course');

// Create a new Course
exports.postCourse = async (req, res, next) => {
    try {
       // Create a new Course with the appropriate Schema
    } catch (error) {
        console.log(error);
    }
};

// Fetch all courses
exports.getCourses = async (req, res, next) => {
    try {
       // Rerturn all the courses back a/c to specified body parameters
    } catch (error) {
        console.log(error);
    }
};

// Fetch course by id
exports.getCourseById = async (req, res, next) => {
    try {
       // Return given id's course
    } catch (error) {
        console.log(error);
    }
};

// Fetch courses by keyword
exports.getCourseByKeyword = async (req, res, next) => {
    try {
       // Return all courses matching the keyword
    } catch (error) {
        console.log(error);
    }
};

// Fetch all courses Filter by price: min - max
exports.getCoursesSortedByPrice = async (req, res, next) => {
    try {
       // Return all courses sorted in asc/desc price
    } catch (error) {
        console.log(error);
    }
};

// Fetch all courses Filter by ratings: 1-5
exports.getCoursesSortedByRatings = async (req, res, next) => {
    try {
       // Return all courses sorted in asc/desc ratings
    } catch (error) {
        console.log(error);
    }
};

// Fetch all courses Filter by category: programming/art/business
exports.getCoursesByCategory = async (req, res, next) => {
    try {
       // Return all courses filtered by category
    } catch (error) {
        console.log(error);
    }
};

// Fetch all courses Filter by partner: google/facebook/microsoft
exports.getCourseByPartner = async (req, res, next) => {
    try {
       // Return all courses Filtered by partner
    } catch (error) {
        console.log(error);
    }
};
