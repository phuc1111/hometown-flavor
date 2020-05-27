var mongoose = require('mongoose')
var date = require('../autoCreate/date')
var foodSchema = new mongoose.Schema({
    foods: {
        type: Array,
        required: [true, 'foods is required']
    },
    location: {
        type: String,
        required: [true, 'location is required']
    },
    image: {
        type: String,
        required: [true, 'image is required']
    },
    image_id: {
        type: String
    },
    housewife_name: {
        type: String,
        required: [true, 'housewife_name is required']
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    name: {
        type: String,
        required: [true, 'name is required']
    },
    isCkeck: {
        type: Boolean,
        default: false
    },
    date: {
        type: String,
        default: date.getNextDay
    }
});
var Food = mongoose.model('Food', foodSchema, 'foods');
module.exports = Food;