const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    role:{
        type: String,
        default: 'user'
    },
    password:{
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;