var mongoose = require('mongoose')

var date = require('../autoCreate/date')

var housewifeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required']
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
        type: Number,
        required: [true, 'Phone is required']
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    joinDate: {
        type: Date,
        default: date.getCurrentDay
    },
    isCkeck: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['user', 'housewife', 'admin'],
        default: 'housewife'
    }

});
var Housewife = mongoose.model('Housewife', housewifeSchema, 'housewifes');
module.exports = Housewife;