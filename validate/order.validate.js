
var date = require('../autoCreate/date')
var Order = require('../model/order.model')
module.exports.checkCreate = function (req, res, next) {
    var errors = [];
    if (!req.body.food_id) {
        errors.push('Vui lòng nhập id sản phẩm');
    }
    if (!req.body.number) {
        errors.push('Vui lòng nhập số lượng');
    }

    if (errors.length) {
        res.status(401).send({ message: errors[0], errors })
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
                res.status(401).send({ message: errors[0] })
                return;
            }
            next()
        })
        .catch(() => {

            res.status(401).send({ message: "Không tìm thấy đơn hàng" })
            // next(err)
        })
}
