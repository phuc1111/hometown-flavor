var Comment = require('../model/comment.model')
var Food = require('../model/food.model')

module.exports.create = function (req, res, next) {
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
            next(err.message);
        })


};

module.exports.getComment = async function (req, res, next) {
    try {
        var comment = await Comment.find();
        res.status(200).send(comment);
    } catch (err) {
        next(err.message)
    }

};

// module.exports.delete = async function (req, res, next) {
//     try {

//         var comment = await Comment.deleteOne({ '_id': req.params.id });
//         res.send({ "message": "Xóa bình luận thành công" });
//     } catch (err) {
//         next(err.message)
//     }
// }
module.exports.delete = function (req, res, next) {
    Comment.find({ '_id': req.params.id })
        .then(comment => {
            console.log(comment);
            console.log(req.userId);
            if (comment.user_id = req.userId) {
                Comment.deleteOne({ '_id': req.params.id })
                    .then(() => {
                        res.send({ "message": "Xóa bình luận thành công" });
                    }).catch(err => {
                        res.status(401).send(err);
                    })

            } else {
                res.status(401).send({ "message": "Bạn không thể xóa bình luận của người khác" });
            }
        }).catch(err => {
            next(err);
        })
}

module.exports.checkOk = async function (req, res, next) {
    try {
        var comment = await Comment.updateOne({ _id: req.params.id }, {
            $set: {
                isckeck: true
            }
        });
        res.status(200).send(comment);

    } catch (err) {
        console.log(err)
        next(err.message)
    }
}
module.exports.update = async function (req, res, next) {
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


