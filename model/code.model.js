var mongoose = require('mongoose')
var code = require('../autoCreate/code')
var codeSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        unique: [true, 'Phone is unique']
    },
    code: {
        type: String,
        default: code.createCode
    }
});
var Code = mongoose.model('Code', codeSchema, 'Codes');
module.exports = Code;