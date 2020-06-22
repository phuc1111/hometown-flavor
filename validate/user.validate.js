

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
        res.status(401).send(errors);
        return;
    }
    next()
}

module.exports.checkSignup = function (req, res, next) {
    var errors = [];

    if (!req.body.phone) {
        errors.push('Phone is require');
    } else {
        if (req.body.phone.length < 6 || req.body.phone.length > 12) {
            errors.push('Phone is not corect');
        } if (!checkPhone(req.body.phone)) {
            errors.push('Phone not valid');
        }
    }
    if (!req.body.password) {
        errors.push('Password is require');
    } else {
        if (req.body.password.length < 6 || req.body.password.length > 32) {
            errors.push('Password is not corect');
        }
    }

    if (errors.length) {
        res.status(401).send(errors);
        return;
    }
    next()
}