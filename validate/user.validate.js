// var Users = require('../model/user.model');

var checkemail = email => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
var checkPhone = phone => {
    var reg = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (phone.match(reg)) {
        return true;
    } else {
        return false;
    }
}

module.exports.checkCreate = function (req, res, next) {

    var err = [];
    var message = null;

    if (!req.body.name) {
        err.push('Vui lòng nhập tên');
    }
    if (!req.body.email) {
        err.push('Vui lòng nhập email');
    }
    if (!req.body.address) {
        err.push('Vui lòng nhập địa chỉ');
    }
    if (!checkemail(req.body.email)) {
        err.push('Email không hợp lệ');
    }
    // if (!req.file) {
    //     err.push('Chưa chọn hình, vui lòng chọn hình');
    // }
    if (err.length) {
        message = err[0]
        res.status(401).send({ err, message });
        return;
    }
    next()
}

module.exports.checkSignup = function (req, res, next) {
    var errors = [];
    if (!req.body.phone) {
        errors.push('Vui lòng nhập số điện thoại');
    } else {
        if (!checkPhone(req.body.phone)) {
            errors.push('Số điện thoại không hợp lệ');
        }
    }
    if (!req.body.password) {
        errors.push('Vui lòng nhập mật khẩu');
    } else {
        if (req.body.password.length < 6 || req.body.password.length > 32) {
            errors.push('Mật khẩu không hợp lệ');
        }
    }

    if (errors.length) {
        res.status(401).send({ errors, message: errors[0] });
        return;
    }
    next()
}

module.exports.checkChangAvatar = function (req, res, next) {
    var errors = [];

    if (!req.file) {
        errors.push('Chưa chọn hình, vui lòng chọn hình');
    }

    if (errors.length) {
        res.status(401).send({ message: errors[0] });
        return;
    }
    next()
}

module.exports.checkChangPassword = function (req, res, next) {
    var errors = [];

    if (!req.body.newPassword) {
        errors.push('Vui lòng cung cấp password mới');
    }
    if (!req.params.phone) {
        errors.push('Chưa có số điện thoại');
    }
    if (!checkPhone(req.params.phone)) {
        errors.push('Vui lòng cung cấp số điện thoại hợp lệ');
    }
    if (errors.length) {
        res.status(401).send({ errors, message: errors[0] });
        return;
    }
    next()
}
