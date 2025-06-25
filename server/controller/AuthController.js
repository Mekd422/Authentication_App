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
            token,
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        next(error);
    }

}

// login a user
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return next(new CreateError('user not found', 404));
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return next(new CreateError('Invalid password', 401));
        }
        const token = jwt.sign({ _id: user._id}, "secretkey123", {
            expiresIn: "90d"});
        res.status(200).json({
            status: 'success',
            message: 'User logged in successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
    }, 
            token
        });

    } catch (error) {
        next(error);
        
    }
}
