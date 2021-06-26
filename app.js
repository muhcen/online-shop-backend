const express = require('express');
const mongoose = require('mongoose');

const cookie_parsers = require('cookie-parser');
// passport
const passport = require('passport');
require('./config/passport')(passport);

// app
const app = express();

//connect to mongodb
mongoose.connect(
    process.env.DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => console.log('connect to database'),
);

//middleware
app.use(
    express.json({
        limit: '10kb',
    }),
);
app.use(cookie_parsers());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// add route
const user = require('./routers/userRouter');
app.use('/api/v1/users/', user);

module.exports = app;
