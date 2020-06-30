var Food = require('../model/food.model')
var config = require('../config');
require('../middleware/cloundinary')

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
const cloudinary = require('cloudinary')

var salt = bcrypt.genSaltSync(10);


module.exports.create = async function (req, res, next) {
    try {
        if (req.role == "housewife") {
            if ((req.body.location == "Miền Bắc") || (req.body.location == "Miền Nam") || (req.body.location == "Miền Trung")) {
                const result = await cloudinary.v2.uploader.upload(req.file.path)
                req.body.image = result.url;
                req.body.image_id = result.public_id;
                //create food
                var food = await Food.create(req.body);
                res.status(200).send(food);
            } else {
                res.status(401).send({ message: "Vùng miền không hợp lệ" });
            }

        } else {
            res.status(401).send({ message: "Không có quyền thêm sản phẩm" });
        }

    } catch (err) {
        console.log(err.message);
        next(err.message)
    }

};

module.exports.getFoods = async function (req, res, next) {
    try {
        if (!req.body.location) {
            var food = await Food.find();
            res.status(200).send(food);
        } else {
            if ((req.body.location == "Miền Bắc") || (req.body.location == "Miền Nam") || (req.body.location == "Miền Trung")) {
                var food = await Food.find({ 'location': req.body.location });
                res.status(200).send(food);
            } else {
                res.status(401).send({ message: "Vùng miền không hợp lệ" });
            }
        }
    } catch (err) {
        console.log(err);
        next(err.message)
    }
};

module.exports.delete = async function (req, res, next) {
    try {
        if (req.role == "admin") {
            await cloudinary.v2.uploader.destroy(req.params.image_id);
            var food = await Food.deleteOne({ '_id': req.params.id });
            res.send({ "message": "Xóa thành công" });
        } else {
            res.status(401).send({ message: "Không có quyền xóa sản phẩm" });

        }

    } catch (err) {
        next(err.message)
    }
}

module.exports.checkOk = async function (req, res, next) {
    try {
        if (req.role == "admin") {
            var food = await Food.updateOne({ _id: req.params.id }, {
                $set: {
                    isCkeck: true
                }
            });
            food.message = "Update thành công"
            res.json(food);
        } else {
            res.status(401).send({ message: "Không có quyền update sản phẩm" });
        }


    } catch (err) {
        next(err.message)
    }
}

