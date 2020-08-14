var checkemail = email => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports.checkCreate = function(req, res, next) {
    var errors = [];
    if (!req.body.name) {
        errors.push('Vui lòng nhập tên');
    }
    if (!req.body.email) {
        errors.push('Vui lòng nhập email');
    }
    if (!req.body.location) {
        errors.push('Vui lòng nhập vùng miền');
    }
    if (!req.body.phone) {
        errors.push('Vui lòng nhập số điện thoại');
    } else {
        if (!checkPhone(req.body.phone)) {
            errors.push('Số điện thoại không hợp lệ');
        }
        if (req.body.phone.length > 10) {
            errors.push('Số điện thoại không hợp lệ');
        }
    }
    if (!req.body.password) {
        errors.push('Vui lòng nhập mật khẩu');
    } else {
        if (req.body.password.length < 6 || req.body.password.length > 32) {
            errors.push('Mật khẩu nhỏ phải lớn hơn 6 kí tự và nhỏ hơn 32 kí tự');
        }
    }

    if (!checkemail(req.body.email)) {
        errors.push('Email không hợp lệ');
    }
    if (errors.length) {
        res.status(400).send({ message: errors[0], errors })
        return;
    }
    next()
}