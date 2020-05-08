var mongoose = require('mongoose')

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
    housewife_name: {
        type: String,
        required: [true, 'housewife_name is required']
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    }
});
var Food = mongoose.model('Food', foodSchema, 'foods');
module.exports = Food;