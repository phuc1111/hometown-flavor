
var Order = require('../model/order.model')
var config = require('../config');
require('../middleware/cloundinary')

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
const cloudinary = require('cloudinary')

var salt = bcrypt.genSaltSync(10);


module.exports.create = async function (req, res, next) {
    try {

        console.log(req.body)
        var order = await Order.create(req.body);
        res.status(200).send(order);
    } catch (err) {
        console.log(err.message);
        next(err.message)
    }

};

module.exports.update = async function (req, res, next) {
    try {
        var order = await Order.updateOne({ _id: req.params.id }, {
            $set: {
                status: req.body.status
            }
        });

        res.status(200).send({ "message": "Update success" });

    } catch (err) {
        next(err.message)
    }
}

module.exports.delete = async function (req, res, next) {
    try {
        var order = await Order.deleteOne({ '_id': req.params.id });
        res.send({ "message": "Delete success" });
    } catch (err) {
        next(err.message)
    }
}


