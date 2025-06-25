const User = require('../models/UserModel');
const CreateError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// register a new user
exports.signup = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            return next(new CreateError('User already exists', 400));
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        const newUser = await User.create({
            ...req.body,
            password: hashedPassword,
        });

        //assign JWT token to user

        const token = jwt.sign({ _id: newUser._id }, "secretkey123", {
            expiresIn: "90d"
        });

        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            token});

    } catch (error) {
        next(error);
    }

}

// login a user
exports.login = async (req, res, next) => {
    
}
