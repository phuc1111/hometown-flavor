var Users = require('../model/user.model');

var code = require('../autoCreate/code');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');

const cloudinary = require('cloudinary')
require('../middleware/cloundinary')
var salt = bcrypt.genSaltSync(10);
//twilio 
var twilio = require('twilio');

var accountSid = 'ACe22d535911002bdeda7e25db8a79c2da'; // Your Account SID from www.twilio.com/console
var authToken = 'e2788c659d1ee62a7a9ce90517fbb189'; // Your Auth Token from www.twilio.com/console

var client = new twilio(accountSid, authToken);



module.exports.login = function(req, res) {
    Users.findOne({ phone: req.body.phone }, function(err, user) {
        if (err) return res.status(500).send({ message: 'Server hiện đang bảo trì' });
        if (!user) return res.status(404).send({ message: 'Không tìm thấy user' });

        // check if the password is valid
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null, message: "Sai mật khẩu" });

        // if user is found and password is valid
        // create a token
        var token = jwt.sign({ id: user._id, role: user.role }, process.env.secret, {
            expiresIn: 3600 // expires in 1 hours
        });

        // return the information including token as JSON
        res.status(200).send({
            users: user,
            auth: true,
            token: token,
            expiresIn: 3600
        });
    });

};

module.exports.logout = function(req, res) {
    res.status(200).send({ auth: false, token: null });
};

module.exports.register = function(req, res, next) {
    cloudinary.v2.uploader.upload(req.file.path).then(data => {
            req.body.avatar = data.url;
            req.body.password = bcrypt.hashSync(req.body.password, salt);
            req.body.image_id = data.public_id;
            Users.create(req.body).then(user => {
                    res.status(200).send(user);
                    // client.messages.create({
                    //     body: "OTP của bạn là " + user.code,
                    //     to: '+' + user.phone,  // Text this number
                    //     from: '+12565888023' // From a valid Twilio number
                    // })
                    //     .then((message) => {
                    //         var response = {
                    //             message: "Đăng ký thành công",
                    //             phone: user.phone,
                    //             email: user.email,
                    //             address: user.address
                    //         }
                    //         res.status(200).send(response);
                    //     })
                    //     .catch(err => {
                    //         next(err)
                    //     });
                })
                .catch(err => {
                    next(err.message);
                })
        })
        .catch(err => {
            next(err.message)
        })
};

module.exports.signup = function(req, res, next) {

    req.body.password = bcrypt.hashSync(req.body.password, salt);
    var user = Users.create(req.body).then(data => {
        res.status(200).send(data);
    }).catch(error => {
        if (error.name === 'MongoError' && error.code === 11000) {
            // next(new Error('There was a duplicate key error'));
            res.status(500).send({ message: 'Số điện thoại đã được đăng ký' });
        } else {
            next(error);
        }

    })

};


module.exports.signupAdmin = function(req, res, next) {

    req.body.password = bcrypt.hashSync(req.body.password, salt);
    req.body.role = "admin";
    var user = Users.create(req.body).then(data => {
        res.status(200).send(data);
    }).catch(error => {
        if (error.name === 'MongoError' && error.code === 11000) {
            // next(new Error('There was a duplicate key error'));
            res.status(400).send({ message: 'Số điện thoại đã được đăng ký' });
        } else {
            next(error);
        }

    })

};

module.exports.me = function(req, res, next) {

    Users.findById(req.userId, { password: 0 }, function(err, user) {
        if (err) return res.status(500).send({
            message: "Users không tồn tại"
        });
        if (!user) return res.status(404).send({
            message: "Không tìm thấy user"
        });
        res.status(200).send(user);
    })
};

module.exports.check = async function(req, res, next) {
    try {
        var user = await Users.updateOne({ code: req.params.code }, {
            $set: {
                isCkeck: true
            }
        });
        res.status(200).json({ "message": "Xác nhận thành công" });

    } catch (err) {
        next(err.message)
    }
}

module.exports.delete = async function(req, res, next) {
    try {
        var user = await Users.deleteOne({ '_id': req.params.id });
        res.send({ "message": "Xóa user thành công", user: user });
    } catch (err) {
        next(err.message)
    }
}

module.exports.changeAvatar = function(req, res, next) {
    cloudinary.v2.uploader.destroy(req.params.image_id).then(() => {
        cloudinary.v2.uploader.upload(req.file.path).then(data => {
            Users.updateOne({ _id: req.userId }, {
                $set: {
                    avatar: data.url
                }
            }).then(() => {
                res.status(200).send({
                    message: "Đổi avatar thành công",
                    avatar: data.url
                })
            }).catch(err => {
                res.status(500).send({
                    message: "Đổi avatar không thành công",
                    avatar: err
                })
            })
        }).catch(err => {
            res.status(500).send({
                message: "Đổi avatar không thành công",
                avatar: err
            })
        })

    }).catch(err => {
        cloudinary.v2.uploader.upload(req.file.path).then(data => {
            Users.updateOne({ _id: req.userId }, {
                $set: {
                    avatar: data.url
                }
            }).then(() => {
                res.status(200).send({
                    message: "Đổi avatar thành công",
                    avatar: data.url
                })
            }).catch(err => {
                res.status(500).send({
                    message: "Đổi avatar không thành công",
                    avatar: err
                })
            })

        }).catch(err => {
            res.status(500).send({
                message: "Đổi avatar không thành công",
                avatar: err
            })
        })
    })

}

module.exports.updateprofile = function(req, res, next) {
    if (req.file) {
        cloudinary.v2.uploader.upload(req.file.path).then(data => {
            req.body.avatar = data.url;
            req.body.image_id = data.public_id;
            Users.findOneAndUpdate({ _id: req.userId }, {
                $set: req.body
            }).then(data => {
                res.status(200).send({
                    message: "Update profile thành công",
                    data: req.body

                })
            }).catch(err => {
                next(err);
            })

        }).catch(err => {
            next(err);
        })
    } else {
        //req.body.forEach
        console.log(req.body);
        Users.findOneAndUpdate({ _id: req.userId }, {
            $set: req.body
        }).then(data => {

            res.status(200).send({
                message: "Update profile thành công",
                data: req.body

            })
        }).catch(err => {
            next(err);
        })
    }
}


module.exports.forgotPassword = async function(req, res, next) {
    try {
        var pass = Math.floor(Math.random() * 1000000);
        newPassword = bcrypt.hashSync(pass.toString(), salt);
        var user = await Users.updateOne({ phone: req.params.phone }, {
            $set: {
                password: newPassword,
                isCkeck: false
            }
        });

        var sms = client.messages.create({
            body: "Mật khẩu mới là: " + pass,
            to: '+' + req.params.phone, // Text this number
            from: '+12565888023' // From a valid Twilio number
        });
        res.status(200).send({ "message": "Đã gửi mật khẩu mới về điện thoại" });
    } catch (error) {
        next(error)
    }
};

module.exports.changepassword = async function(req, res, next) {
    try {
        var user = Users.updateOne({ _id: req.userId }, {
            $set: {
                password: bcrypt.hashSync(req.body.newPassword, salt),
                isCkeck: true
            }
        });
        res.status(200).send({ "message": "Đổi mật khẩu thành công" });
    } catch (error) {
        next(error);
    }
}

module.exports.getAllUser = async function(req, res, next) {
    try {
        if (req.role == "admin") {
            var users = await Users.find();
            res.status(200).send(users);
        } else {
            res.status(403).send({ "message": "Không có quyền truy cập" });
        }

    } catch (err) {
        next(err.message)
    }
}