const express = require("express");
const morgan = require('morgan');

const app = express();

const tourRouter = require(`${__dirname}/routes/tourRouter`);
const userRouter = require(`${__dirname}/routes/userRoutes`);

//1) MIDDLEWARES
process.env.NODE_ENV === 'development' && app.use(morgan('dev'));

app.use(express.json());
app.use(express.static(`${__dirname}/public/`));
//2)ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;