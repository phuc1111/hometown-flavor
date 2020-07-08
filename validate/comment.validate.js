var Comment = require('../model/comment.model')

module.exports.checkCreate = function (req, res, next) {
    var errors = [];
    if (!req.body.id_food) {
        errors.push('Vui lòng thêm id sản phẩm');
    }
    if (!req.body.from) {
        errors.push('Vui lòng thêm tên người bình luận');
    }
    if (!req.body.content) {
        errors.push('Vui lòng thêm nội dung bình luận');
    } else {
        if (req.body.content.length < 4) {
            errors.push('Nội dung ít nhật là 4 kí tự');
        }
        if (req.body.content.length > 160) {
            errors.push('Nội dung không vượt quá 160 kí tự');
        }
    }
    if (!parseInt(req.body.rate)) {
        errors.push('Vui lòng thêm đánh giá');
    } else {
        if (parseInt(req.body.rate) < 1) {
            errors.push('Số sao nhỏ nhất là 1');
        }
        if (parseInt(req.body.rate) > 5) {
            errors.push('Số sao lớn nhất là 5');
        }
    }
    if (errors.length) {
        res.status(400).send({ message: errors[0], errors })
        return;
    }
    next()
}