const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const courseRoutes = require('./routes/course');

const app = express();
dotenv.config();

app.use(courseRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(result => {
    console.log("🎉 Database connected.");
    app.listen(process.env.PORT || 80, function () {
        console.log('✨ App listening on port', this.address().port);
    });
  })
  .catch(err => {
    console.log(err);
  });