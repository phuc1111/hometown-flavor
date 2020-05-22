var User = require('../model/user.model')

var checkemail = email => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports.checkCreate = function (req, res, next) {
    var errors = [];
    if (!req.body.name) {
        errors.push('Name is require');
    }
    if (!req.body.email) {
        errors.push('Email is require');
    }
    if (!req.body.address) {
        errors.push('Address is require');
    }
    if (!req.body.phone) {
        errors.push('Phone is require');
    } else {
        if (req.body.phone.length < 6 || req.body.phone.length > 12) {
            errors.push('Phone is not corect');
        }
    }
    if (!req.body.password) {
        errors.push('Password is require');
    } else {
        if (req.body.password.length < 6 || req.body.password.length > 32) {
            errors.push('Password is not corect');
        }
    }
    if (!checkemail(req.body.email)) {
        errors.push('Email is not corect');
    }
    // if (!req.body.avatar) {
    //     errors.push('Avatar is not corect');
    // }
    if (errors.length) {
        res.json(errors)
        return;
    }
    next()
}

var checkExist = id => {
    var result;
    var user = User.count({ _id: id }, function (err, count) {
        if (err) {
            result = 0;
        } else {
            result = count;
        }
    });
    return result;
}

module.exports.checkTrueFalse = function (req, res, next) {
    var errors = [];
    if (this.checkExist(req.params.id) = 0) {
        errors.push("User do not exist");
    }
    if (errors.length) {

        res.json(errors)
        return;
    }
    console.log(errors);
    next()

}