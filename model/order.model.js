var mongoose = require('mongoose')

var date = require('../autoCreate/date')

var orderSchema = new mongoose.Schema({
    date_order: {
        type: String,
        default: date.getCurrentDay
    },
    date_getOrder: {
        type: String,
        required: [true, 'date_getOrder is required']
    },
    menu_id: {
        type: String,
        required: [true, 'menu_id is required']
    },
    status: {
        type: String,
        enum: ['ordered', 'confirmed', 'cooked', 'shipping', 'done'],
        default: 'ordered'
    },
    image: {
        type: String,
        required: [true, 'image is required']
    }
});
var Order = mongoose.model('Order', orderSchema, 'orders');
module.exports = Order;