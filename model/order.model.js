var mongoose = require('mongoose')

var date = require('../autoCreate/date')

var orderSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: [true, 'user_id is required']
    },
    date_order: {
        type: String,
        default: date.getCurrentDay
    },
    date_getOrder: {
        type: String,
        default: date.getNextDay
    },
    food_id: {
        type: String,
        required: [true, 'Food is required']
    },
    status: {
        type: String,
        enum: ['ordered', 'confirmed', 'done'],
        default: 'ordered'
    },
    image: {
        type: String,
        required: [true, 'image is required']
    },
    number: {
        type: Number,
        required: [true, 'Number is required']
    }

});
var Order = mongoose.model('Order', orderSchema, 'orders');
module.exports = Order;