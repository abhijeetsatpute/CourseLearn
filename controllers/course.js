const { validationResult, body } = require('express-validator/check');

const Course = require('../models/course');

// Create a new Course
exports.postCourse = async (req, res, next) => {
    // Create a new Course with the appropriate Schema
    const {Name, Type, Duration, Price, Mrp, Discount, Rating, Category, Thumbnail, Demo, Partner} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).json({message: 'Invalid Data'});
    }
    try {
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
       if(!course){
        return res.status(404).json({message: `Course with id ${course_id} not found`});
       }
       res.status(200).json({message: `Fetched ${course_id} course`, course: course});
    } catch (error) {
        console.log(error);
    }
};

// Update course by id
exports.updateCourseById = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).json({message: 'Invalid Data'});
    }
    try {
       // Return updated course
        const course_id = req.params.id;
        const update = req.body;
        const doc = await Course.findOneAndUpdate(
            {_id: course_id},
            update
        );
        if(!doc){
            return res.status(404).json({message: `Course with id ${course_id} not found`});
        }
        res.status(204).json({message: `Updated ${course_id} course`, course: doc});
    } catch (error) {
        console.log(error);
    }
};

// Delete course by id
exports.deleteCourseById = async (req, res, next) => {
    const course_id = req.params.id;
    try {
       // Return Deleted course
        const doc = await Course.findById(course_id);
        if(!doc){
            return res.status(404).json({message: `Course with id ${course_id} not found`});
        }
        const result = await Course.deleteOne({ _id: course_id});
        res.status(200).json({message: `Deleted ${course_id} course`, course: doc});
    } catch (error) {
        console.log(error);
    }
};


exports.validate = (method) => {
    switch (method) {
        case 'postCourse': {
            return [
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
            ]   
        }
        case 'updateCourseById' : {
            return [
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
            ]
        }
      }
}

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
