
var date = require('../autoCreate/date')
var Order = require('../model/order.model')
module.exports.checkCreate = function (req, res, next) {
    var errors = [];
    if (!req.body.food_id) {
        errors.push('Food_id is require');
    }
    if (!req.body.number) {
        errors.push('Number is require');
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
            if (data[0].date_getOrder = date.getCurrentDay) {
                errors.push('Vui lòng hủy đơn hàng trước 1 ngày');
            }
            if (errors.length) {
                res.status(401).send(errors)
                return;
            }
            next()
        })
        .catch(err => {
            err.message = "Không tìm thấy đơn hàng";
            res.status(401).send(err)
            // next(err)
        })
}
