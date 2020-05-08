var mongoose = require('mongoose')

var menuSchema = new mongoose.Schema({
    food_id: {
        type: String,
        required: [true, 'food_id is required']
    },
    count: {
        type: Number,
        required: [true, 'Count is required']
    }
});
var Menu = mongoose.model('Menu', menuSchema, 'menus');
module.exports = Menu;