var Food = require('../model/food.model')
var config = require('../config');
require('../middleware/cloundinary')

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
const cloudinary = require('cloudinary')

var salt = bcrypt.genSaltSync(10);


module.exports.create = async function (req, res, next) {
    try {
        // const result = await cloudinary.v2.uploader.upload(req.file.path)
        // req.body.image = result.url;
        req.body.image = "http://res.cloudinary.com/hometown-flavor/image/upload/v1589972572/gxy5niyepky63vbottqy.jpg";
        // req.body.image_id = result.public_id;
        console.log(req.body)
        var food = await Food.create(req.body);
        res.status(200).send(food);
    } catch (err) {
        console.log(err.message);
        next(err.message)
    }

};

module.exports.getFoods = async function (req, res, next) {
    try {
        var food = await Food.find();
        res.status(200).send(food);
    } catch (err) {
        console.log(err);
        next(err.message)
    }
};

module.exports.delete = async function (req, res, next) {
    try {
        // await cloudinary.v2.uploader.destroy(req.body.image_id);
        var food = await Food.deleteOne({ '_id': req.params.id });
        res.send({ "message": "Delete success" });
    } catch (err) {
        next(err.message)
    }
}

module.exports.checkOk = async function (req, res, next) {
    try {
        var food = await Food.updateOne({ _id: req.params.id }, {
            $set: {
                isCkeck: true
            }
        });
        res.json(food);

    } catch (err) {
        next(err.message)
    }
}

