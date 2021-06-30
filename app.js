const express = require('express');
const mongoose = require('mongoose');

const cookie_parsers = require('cookie-parser');

// app
const app = express();

//connect to mongodb
mongoose.connect(
    process.env.DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
    () => console.log('connect to database'),
);

//middleware
app.use(express.static('public'));
app.use(
    express.json({
        limit: '10kb',
    }),
);
app.use(cookie_parsers());
app.use(express.urlencoded({ extended: true }));

// add route
app.use('/api/v1/users/', require('./routers/userRouter'));
app.use('/api/v1/goods/', require('./routers/goodsRouter'));

module.exports = app;
