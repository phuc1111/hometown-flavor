var mongoose = require('mongoose')

var date = require('../autoCreate/date')

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email is unique']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    avatar: String,
    phone: {
        type: String,
        required: [true, 'Phone is required']
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    joinDate: {
        type: Date,
        default: date.getCurrentDay
    },
    role: {
        type: String,
        enum: ['user', 'housewife', 'admin'],
        default: 'user'
    }
});
var User = mongoose.model('User', userSchema, 'users');
module.exports = User;