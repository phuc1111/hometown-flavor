var mongoose = require('mongoose')

var date = require('../autoCreate/date')

var commentSchema = new mongoose.Schema({
    id_food: {
        type: String,
        required: [true, 'id_food is required']
    },
    from: {
        type: String,
        required: [true, 'from is required']
    },
    user_id: String,
    to: {
        type: String,
        required: [true, 'to is required']
    },
    content: {
        type: String,
        required: [true, 'content is required']
    },
    rate: {
        type: Number,
        required: [true, 'Rate is required']
    },
    date: {
        type: String,
        default: date.getCurrentDay
    },
    isckeck: {
        type: Boolean,
        default: false
    }

});
var Comment = mongoose.model('Comment', commentSchema, 'comments');
module.exports = Comment;