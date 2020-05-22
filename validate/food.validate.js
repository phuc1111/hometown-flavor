var Food = require('../model/food.model')

module.exports.checkCreate = function (req, res, next) {
    var errors = [];
    if (!req.body.foods) {
        errors.push('Foods is require');
    }
    if (!req.body.location) {
        errors.push('Location is require');
    }
    if (!req.body.housewife_name) {
        errors.push('Housewife_name is require');
    }
    if (!req.body.price) {
        errors.push('Price is require');
    } else {
        if (req.body.price.length < 4) {
            errors.push('Price is not corect');
        }
    }
    if (!req.body.name) {
        errors.push('Name is require');
    }
    if (errors.length) {
        res.status(401).send(errors)
        return;
    }
    next()
}