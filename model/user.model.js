var mongoose = require('mongoose')

var date = require('../autoCreate/date')
var code = require('../autoCreate/code')
delete mongoose.connection.models['User'];
var userSchema = new mongoose.Schema({
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
        unique: [true, 'Phone is unique'],
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
        enum: ['user', 'admin'],
        default: 'user'
    },
    isCkeck: {
        type: Boolean,
        default: false
    },
    code: {
        type: Number,
        default: code.createCode
    },
    email: {
        type: String
    },
    image_id: String
});
var User = mongoose.model('User', userSchema, 'users');
module.exports = User;