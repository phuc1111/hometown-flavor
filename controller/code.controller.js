var Code = require('../model/code.model')


module.exports.getCode = async function(req, res, next) {
    try {
        var code = await Code.find({ phone: req.params.phone });
        console.log("get code running" + code)
        next(code);
        console.log("next")
    } catch (err) {
        // console.log(err);
        next(err.message);
    }
};