require('dotenv').config();
require('express-async-errors');
const connectDB = require('./db/connect');
const express = require('express');
const app = express();

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// auth middleware
const authenticateUser = require('./middleware/authentication')

app.use(express.json());
// extra packages

// routes
const jobsRoute = require('./routes/jobs')
const authRoute = require('./routes/auth')

app.use('/api/v1/jobs', authenticateUser, jobsRoute)
app.use('/api/v1/auth', authRoute)

// not found and errors
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// server event listener
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();