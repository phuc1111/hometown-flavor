var Food = require('../model/food.model')

module.exports.checkCreate = function (req, res, next) {
    var errors = [];
    if (!req.body.foods) {
        errors.push('Vui lòng thêm chi tiết');
    }
    if (!req.body.location) {
        errors.push('Vui lòng thêm vùng miền');
    }
    if (!req.file) {
        errors.push('Chưa có hình');
    }
    if (!req.body.description) {
        errors.push('Vui lòng thêm mô tả');
    }
    if (!req.body.housewife_name) {
        errors.push('Vui lòng thêm tên đầu bếp');
    }
    if (!req.body.price) {
        errors.push('Vui lòng thêm giá sản phẩm');
    } else {
        if (req.body.price.length < 4) {
            errors.push('Giá nhỏ nhât là 1000 vnd');
        }
    }
    if (!req.body.name) {
        errors.push('Vui lòng thêm tên sản phẩm');
    }
    if (errors.length) {
        res.status(400).send({ message: errors[0], errors })
        return;
    }
    next()
}