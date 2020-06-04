var Order = require('../model/order.model')
var Food = require('../model/food.model')

module.exports.create = async function (req, res, next) {
    Food.findById({ _id: req.body.food_id }).then(food => {
        req.user_id = req.userId;
        req.body.total = parseInt(food.price) * req.body.number;
        req.body.image = food.image;
        if (food.isCkeck == true) {
            Order.create(req.body).then(order => {
                res.status(200).send({
                    message: "Order thành công",
                    orders: order,
                    foods: food
                })
            }).catch(err => {
                next(err);
            })
        } else {
            res.status(401).send({
                message: "Sản phẩm chưa được kiểm định"
            })
        }
    }).catch(err => {
        next(err);
    })


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


