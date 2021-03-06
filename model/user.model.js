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
        default: null
    },
    avatar: String,
    phone: {
        type: String,
        unique: [true, 'Phone is unique'],
        required: [true, 'Phone is required']
    },
    address: {
        type: String,
        default: null
    },
    joinDate: {
        type: Date,
        default: date.getCurrentDay
    },
    role: {
        type: String,
        enum: ['user', 'housewife', 'admin'],
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
        type: String,
        default: null
    },
    image_id: String
});
var User = mongoose.model('User', userSchema, 'users');
module.exports = User;