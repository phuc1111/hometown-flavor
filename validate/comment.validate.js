var Comment = require('../model/comment.model')

module.exports.checkCreate = function (req, res, next) {
    var errors = [];
    if (!req.body.id_food) {
        errors.push('id_Food is require');
    }
    if (!req.body.from) {
        errors.push('From is require');
    }
    if (!req.body.content) {
        errors.push('Content is require');
    } else {
        if (req.body.content.length < 4) {
            errors.push('Min length of content is 4');
        }
        if (req.body.content.length > 160) {
            errors.push('Max length of content is 160');
        }
    }
    if (!parseInt(req.body.rate)) {
        errors.push('Rate is require');
    } else {
        if (parseInt(req.body.rate) < 1) {
            errors.push('Min rate is 1');
        }
        if (parseInt(req.body.rate) > 5) {
            errors.push('Max rate is 5');
        }
    }
    if (errors.length) {
        res.status(401).send(errors)
        return;
    }
    next()
}