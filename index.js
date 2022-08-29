const fs = require('fs');
const path = require('path');

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');

const courseRoutes = require('./routes/course');

const app = express();
dotenv.config();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname,'access.log'), 
  {flags: 'a'}
);

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(courseRoutes);

app.use(helmet());
app.use(morgan('combined', {stream: accessLogStream}));

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