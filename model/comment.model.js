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
    content: {
        type: String,
        required: [true, 'content is required']
    }
});
var Comment = mongoose.model('Comment', commentSchema, 'comments');
module.exports = Comment;