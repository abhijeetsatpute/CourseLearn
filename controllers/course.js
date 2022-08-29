const Course = require('../models/course');

// Create a new Course
exports.postCourse = async (req, res, next) => {
    try {
        // Create a new Course with the appropriate Schema
        const {Name, Type, Duration, Price, Mrp, Discount, Rating, Category, Thumbnail, Demo, Partner} = req.body;
        const newCourse = new Course({Name, Type, Duration, Price, Mrp, Discount, Rating, Category, Thumbnail, Demo, Partner});
        const result = newCourse.save();
        res.status(201).json({message:'Course Created !', course: newCourse});
    } catch (error) {
        console.log(error);
    }
};

// Fetch all courses
exports.getAllCourses = async (req, res, next) => {
    const { keyword, pricesort, rating, category, partner } = req.query;
    
    // Construct the find query from valid query parameters
    let query = {};
    if ( keyword ) query.Name = { $regex: keyword, $options: "i" };
    if ( rating ) query.Rating = +(rating);
    if ( category ) query.Category = category;
    if ( partner ) query.Partner = partner;

    // Similarly construct sort query IF present in query parameters
    let sortQuery = {};
    if ( pricesort ) { sortQuery.Price = pricesort };

    try {
       // Rerturn all the courses back a/c to Queries formed above
        let courses = await Course.find(query).sort(sortQuery);
        res.status(200).json({message: `Fetched all ${courses.length} courses`, courses: courses});
    } catch (error) {
        console.log(error);
    }
};

// Fetch course by id
exports.getCourseById = async (req, res, next) => {
    try {
       // Return given id's course
       const course_id = req.params.id;
       const course = await Course.find({_id: course_id});
       res.status(200).json({message: `Fetched ${course_id} course`, course: course});
    } catch (error) {
        console.log(error);
    }
};


// // Fetch all courses Filter by price: min - max
// exports.getCoursesSortedByPrice = async (req, res, next) => {
//     try {
//        // Return all courses sorted in asc/desc price
//     } catch (error) {
//         console.log(error);
//     }
// };

// // Fetch all courses Filter by ratings: 1-5
// exports.getCoursesSortedByRatings = async (req, res, next) => {
//     try {
//        // Return all courses sorted in asc/desc ratings
//     } catch (error) {
//         console.log(error);
//     }
// };

// // Fetch all courses Filter by category: programming/art/business
// exports.getCoursesByCategory = async (req, res, next) => {
//     try {
//        // Return all courses filtered by category
//     } catch (error) {
//         console.log(error);
//     }
// };

// // Fetch all courses Filter by partner: google/facebook/microsoft
// exports.getCourseByPartner = async (req, res, next) => {
//     try {
//        // Return all courses Filtered by partner
//     } catch (error) {
//         console.log(error);
//     }
// };
