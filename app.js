/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
const fs = require ('fs');
const express = require ('express');
const morgan = require ('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// TODO: Middlewares
if (process.env.NODE_ENV === 'development') {
    // TODO: morgan make response on detail format like id,route,status,time,bytes
    app.use(morgan('dev'));
}

//TODO: express parse the data from the body
app.use(express.json());

// TODO: Route to file public and see all files
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
   console.log('Hello from the middleware');
   next();
});

// TODO: middleware to add time request data to API file
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// TODO: Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;