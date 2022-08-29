const express = require('express');

const courseRoutes = require('./routes/course');

const app = express();

app.use(courseRoutes);

app.listen(80, function () {
    console.log('🎇 App listening on port 80');
})