# CourseLearn

Created a simple REST api with Courses data to be fetched and created with express, node.js and mongoose ODM for mongoDB.


API example with Node.js, Express and mongodb

## Getting Started

```
npm install
```

## Methods

### Get ALL Courses
```
GET http://localhost/courses
```

### Get single course by id
```
GET http://localhost/course/:id
```

### Create a new Course
```
POST http://localhost/todos
Content-Type: application/json

{
    "Name": "React.js the complete guide",
    "Type": "intermediate",
    "Duration": "50",
    "Price": "500",
    "Mrp": "1500",
    "Discount": "30",
    "Rating": "4",
    "Category": "programming",
    "Thumbnail": "https://picsum.photos/200",
    "Demo": "https://www.youtube.com/watch?v=TlB_eWDSMt4&t=476s",
    "Partner": "google"
}

```

### Update Course
```
PUT http://localhost/course/:id
Content-Type: application/json

{
    "Name": "React.js the complete guide",
    "Type": "intermediate",
    "Duration": "50",
    "Price": "500",
    "Mrp": "1500",
    "Discount": "30",
    "Rating": "4",
    "Category": "programming",
    "Thumbnail": "https://picsum.photos/200",
    "Demo": "https://www.youtube.com/watch?v=TlB_eWDSMt4&t=476s",
    "Partner": "google"
}

```

### Delete a course
```
DELETE http://localhost/course/:id
Content-Type: application/json
```

## Authors
* **Abhijeet Satpute** - *Developer* - [Abhijeet](https://github.com/abhijeetsatpute)
