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
    if (!req.body.location) {
        errors.push('Location is require');
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
    if (errors.length) {
        res.status(401).send(errors)
        return;
    }
    next()
}