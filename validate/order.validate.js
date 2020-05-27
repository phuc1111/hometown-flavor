
var date = require('../autoCreate/date')
var Order = require('../model/order.model')
module.exports.checkCreate = function (req, res, next) {
    var errors = [];
    if (!req.body.food) {
        errors.push('Food is require');
    }
    if (!req.body.number) {
        errors.push('Number is require');
    }
    if (!req.body.image) {
        errors.push('Image is require');
    }
    if (errors.length) {
        res.status(401).send(errors)
        return;
    }
    next()
}
module.exports.checkDelete = function (req, res, next) {
    var errors = [];
    Order.find({ _id: req.params.id })
        .then(data => {
            console.log(data[0].date_getOrder);
            if (data[0].date_getOrder = date.getCurrentDay) {
                errors.push('Please cancer before one day');
            }
            if (errors.length) {
                res.status(401).send(errors)
                return;
            }
            next()
        })
        .catch(err => {
            // console.log(err)
            next(err)
        })
}
