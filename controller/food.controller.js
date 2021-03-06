var Food = require('../model/food.model')
var Comment = require('../model/comment.model')
var date = require('../autoCreate/date')

require('../middleware/cloundinary')

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
const cloudinary = require('cloudinary')

var salt = bcrypt.genSaltSync(10);


module.exports.create = async function (req, res, next) {
    try {
        if (req.role == "housewife") {
            if ((req.body.location == "Miền Bắc") || (req.body.location == "Miền Nam") || (req.body.location == "Miền Trung")) {
                // const result = await cloudinary.v2.uploader.upload(req.file.path)
                // req.body.image = result.url;
                // req.body.image_id = result.public_id;
                req.body.housewife_id = req.userId;
                //create food
                var food = await Food.create(req.body);
                res.status(200).send(food);
            } else {
                res.status(400).send({ message: "Vùng miền không hợp lệ" });
            }

        } else {
            res.status(403).send({ message: "Không có quyền thêm sản phẩm" });
        }

    } catch (err) {
        console.log(err.message);
        next(err.message)
    }

};


module.exports.postImage = async function (req, res, next) {
    try {
        const result = await cloudinary.v2.uploader.upload(req.body.image_base64);
        res.status(200).send({
            message: "Thêm hình ảnh thành công",
            image: result.url
        })
    } catch (err) {
        console.log(err.message);
        next(err.message)
    }
}

module.exports.getFoods = async function (req, res, next) {
    try {
        if (req.query.location == 1) {
            var food = await Food.find({ 'location': "Miền Bắc", isCkeck: true });
            res.status(200).send(food);
        } else if (req.query.location == 2) {
            var food = await Food.find({ 'location': "Miền Nam", isCkeck: true });
            res.status(200).send(food);
        } else if (req.query.location == 3) {
            var food = await Food.find({ 'location': "Miền Trung", isCkeck: true });
            res.status(200).send(food);
        } else {
            var food = await Food.find({ isCkeck: true });
            res.status(200).send(food);
        }

    } catch (err) {
        console.log(err);
        next(err.message)
    }
};

module.exports.getFoodByHousewife = async function (req, res, next) {
    try {
        if (req.role == "housewife") {
            var food = await Food.find({ housewife_id: req.userId, isCkeck: true });
            res.status(200).send(food);
        } else {
            res.status(403).send({ message: "Không có quyền truy cập" })
        }
    } catch (err) {
        console.log(err);
        next(err.message)
    }
};

module.exports.getAllFoodForAdmin = async function (req, res, next) {
    try {
        if (req.role == "admin") {
            var food = await Food.find();
            res.status(200).send(food);
        } else {
            res.status(403).send({ message: "Không có quyền truy cập" })
        }
    } catch (err) {
        console.log(err);
        next(err.message)
    }
};

module.exports.getNorthFoods = async function (req, res, next) {
    try {
        var food = await Food.find({ 'location': 'Miền Bắc' });
        res.status(200).send(food);
    } catch (err) {
        next(err.message)
    }
};

module.exports.getCentralFoods = async function (req, res, next) {
    try {
        var food = await Food.find({ 'location': 'Miền Trung' });
        res.status(200).send(food);
    } catch (err) {
        next(err.message)
    }
};


module.exports.getSouthFoods = async function (req, res, next) {
    try {
        var food = await Food.find({ 'location': 'Miền Nam' });
        res.status(200).send(food);
    } catch (err) {
        next(err.message)
    }
};
module.exports.delete = async function (req, res, next) {
    try {
        if (req.role == "admin") {
            await cloudinary.v2.uploader.destroy(req.params.image_id);
            await Food.deleteOne({ '_id': req.params.id });
            res.send({ "message": "Xóa thành công" });
        } else if (req.role == "housewife") {
            var food = await Food.findById(req.params.id);
            if (!food) {
                res.status(404).send({ message: "Không tìm thấy sản phẩm" });
            }
            if (food.housewife_id == req.userId) {
                await Food.deleteOne({ '_id': req.params.id });
                res.send({ "message": "Xóa thành công" });
            } else {
                res.status(403).send({ message: "Không có quyền xóa sản phẩm" });
            }
            // console.log();

        } else {
            res.status(403).send({ message: "Không có quyền xóa sản phẩm" });

        }

    } catch (err) {
        next(err.message)
    }
}

module.exports.getFoodFromId = async function (req, res, next) {
    try {
        var food = await Food.findById(req.params.id);
        var comments = await Comment.find({ id_food: req.params.id });

        res.status(200).send({
            message: "Lấy chi tiết sản phẩm thành công",
            food: food,
            comments: comments
        });

    } catch (err) {
        if (err.name == "CastError" && err.path == "_id") {
            res.status(404).send({
                message: "Sản phẩm không tồn tại",
                data: err
            })
        }
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
            res.status(403).send({ message: "Không có quyền update sản phẩm" });
        }
    } catch (err) {
        next(err.message)
    }
}

module.exports.checkStatus = async function (req, res, next) {
    try {
        await Food.updateMany({ date: { $lt: date.getNextDay } }, {
            $set: {
                isCkeck: false
            }
        });
    } catch (err) {
        next(err.message)
    }
}