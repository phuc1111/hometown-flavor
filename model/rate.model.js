var mongoose = require('mongoose')

var rateSchema = new mongoose.Schema({
    id_food: {
        type: String,
        required: [true, 'id_food is required']
    },
    from: {
        type: String,
        required: [true, 'from is required']
    },
    star_number: {
        type: String,
        required: [true, 'star_number is required']
    }
});
var Rate = mongoose.model('Rate', rateSchema, 'rates');
module.exports = Rate;