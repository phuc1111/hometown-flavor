var Order = require('../model/order.model')
var Food = require('../model/food.model')

module.exports.create = async function(req, res, next) {
    Food.findById({ _id: req.body.food_id }).then(food => {
        console.log(food)
        req.body.user_id = req.userId;
        req.body.total = parseInt(food.price) * req.body.number;
        req.body.image = food.image;
        req.body.housewife_id = food.housewife_id;
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

module.exports.update = async function(req, res, next) {
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

module.exports.delete = async function(req, res, next) {
    try {
        var order = await Order.deleteOne({ '_id': req.params.id });
        res.send({ "message": "Delete success" });
    } catch (err) {
        next(err.message)
    }
}

module.exports.getOrder = async function(req, res, next) {
    try {
        var order = await Order.find({ 'user_id': req.userId });
        res.status(200).send(order);
    } catch (err) {
        next(err.message)
    }
}

module.exports.getAllOrder = async function(req, res, next) {
    try {
        if (req.role == "admin") {
            var order = await Order.find();
            res.status(200).send(order);
        } else {
            res.status(403).send({ "message": "Không có quyền truy cập" });
        }

    } catch (err) {
        next(err.message)
    }
}

// module.exports.getHistory = async function(req, res, next) {
//     try {
//         var order = await Order.find({ 'user_id': req.userId });
//         res.status(200).send(order);
//     } catch (err) {
//         next(err.message)
//     }
// }