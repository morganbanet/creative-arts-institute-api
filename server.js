const path = require('path');
const express = require('express');
const fileupload = require('express-fileupload');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Dotenv config
require('dotenv').config({ path: './config/config.env' });

// Route imports
const trainingPrograms = require('./routes/trainingPrograms');
const courses = require('./routes/courses');

// Connect to database
connectDB();

// Express config
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// File upload
app.use(fileupload());

// Morgan config
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Route mounting
app.use('/api/v1/training-programs', trainingPrograms);
app.use('/api/v1/courses', courses);

// Error middleware
app.use(errorHandler);

// Run server
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(process.exit(1));
});
