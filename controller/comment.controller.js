var Comment = require('../model/comment.model')
var Food = require('../model/food.model')

module.exports.create = function(req, res, next) {
    Food.find({ _id: req.body.id_food })
        .then(data => {
            req.body.to = data[0].housewife_name;
            req.body.user_id = req.userId;
            Comment.create(req.body)
                .then(comment => {
                    res.status(200).send(comment);
                })
                .catch(err => {
                    next(err.message);
                })
        })
        .catch(error => {
            // next(err.message);
            console.log(error)
            res.status(404).send({
                message: "Không tìm thấy sản phẩm này",
                error
            })
        })
};

module.exports.getComment = function(req, res, next) {

    Food.findById(req.params.id_food).then(() => {
        Comment.find({ id_food: req.params.id_food }).then(data => {
            res.status(200).send(comment);
        }).catch(err => {
            res.status(404).send({
                message: "Sản phẩm này chưa có bình luận",
                err
            });
        })
    }).catch(err => {
        res.status(404).send({
            message: "Không tìm thấy sản phẩm này",
            err
        });
    })

};

module.exports.delete = function(req, res, next) {
    Comment.find({ '_id': req.params.id })
        .then(comment => {
            if (comment.user_id = req.userId) {
                Comment.deleteOne({ '_id': req.params.id })
                    .then(() => {
                        res.send({ "message": "Xóa bình luận thành công" });
                    }).catch(err => {
                        res.status(500).send(err);
                    })
            } else {
                res.status(403).send({ "message": "Bạn không thể xóa bình luận này" });
            }
        }).catch(err => {
            res.status(404).send({ "message": "Không tìm thấy bình luận" });
        })
}

module.exports.checkOk = async function(req, res, next) {
    try {
        if (req.role == "admin") {
            var comment = await Comment.updateOne({ _id: req.params.id }, {
                $set: {
                    isckeck: true
                }
            });
            res.status(200).send(comment);
        } else {
            res.status(403).send({ message: "Không có quyền xác nhận bình luận" })
        }

    } catch (err) {
        console.log(err)
        next(err.message)
    }
}
module.exports.update = async function(req, res, next) {
    try {
        var comment = await Comment.updateOne({ _id: req.params.id }, {
            $set: {
                isckeck: true,
                id_food: req.body.id_food,
                content: req.body.content,
                rate: req.body.rate,
                from: req.body.from
            }
        });
        res.status(200).send({ "message": "Sửa bình luận thành công" });

    } catch (err) {
        console.log(err)
        next(err.message)
    }
}

module.exports.getAllComment = async function(req, res, next) {
    try {
        if (req.role == "admin") {
            var comments = await Comment.find();
            res.status(200).send(comments);
        } else {
            res.status(403).send({ "message": "Không có quyền truy cập" });
        }

    } catch (err) {
        next(err.message)
    }
}