const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoute');
const app = express();


// middleware to parse JSON bodies
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);


// mongodb connection
mongoose.connect('mongodb://localhost:27017/mydatabase')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// global error handler

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';


    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});

// server setup
const PORT =  3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});