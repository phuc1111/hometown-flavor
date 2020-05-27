var User = require('../model/user.model');
var code = require('../autoCreate/code');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../config');
const cloudinary = require('cloudinary')
require('../middleware/cloundinary')
var salt = bcrypt.genSaltSync(10);
//twilio 
var twilio = require('twilio');

var accountSid = 'ACe22d535911002bdeda7e25db8a79c2da'; // Your Account SID from www.twilio.com/console
var authToken = 'b95d78cc754edb3f81949fae15ad465b';   // Your Auth Token from www.twilio.com/console

var client = new twilio(accountSid, authToken);



module.exports.login = function (req, res) {

    User.findOne({ phone: req.body.phone }, function (err, user) {
        if (err) return res.status(500).send('Server hiện đang bảo trì');
        if (!user) return res.status(404).send('Không tìm thấy user');

        // check if the password is valid
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null, message: "Sai mật khẩu" });

        // if user is found and password is valid
        // create a token
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 3600 // expires in 1 hours
        });

        // return the information including token as JSON
        res.status(200).send(
            {
                auth: true,
                token: token,
                expiresIn: 3600,
                role: 'user'
            }
        );
    });

};

module.exports.logout = function (req, res) {
    res.status(200).send({ auth: false, token: null });
};

module.exports.register = function (req, res, next) {
    cloudinary.v2.uploader.upload(req.file.path).then(data => {
        req.body.avatar = data.url;
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        req.body.image_id = data.public_id;
        User.create(req.body).then(user => {
            client.messages.create({
                body: user.code,
                to: '+' + user.phone,  // Text this number
                from: '+12565888023' // From a valid Twilio number
            })
                .then((message) => {
                    console.log(message);
                    var response = {
                        message: "Đăng ký thành công",
                        phone: user.phone,
                        email: user.email,
                        address: user.address
                    }
                    res.status(200).send(response);
                })
                .catch(err => {
                    console.log(err)
                    next(err)
                });
        })
            .catch(err => {
                next(err.message);
            })
    })
        .catch(err => {
            next(err.message)
        })
};

module.exports.me = function (req, res, next) {

    User.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("User không tồn tại");
        if (!user) return res.status(404).send("Không tìm thấy user");
        res.status(200).send(user);
    })
};

module.exports.check = async function (req, res, next) {
    // console.log(req.params.code)
    try {
        var user = await User.updateOne({ code: req.params.code }, {
            $set: {
                isCkeck: true
            }
        });
        res.status(200).json({ "message": "Xác nhận thành công" });

    } catch (err) {
        next(err.message)
    }
}

module.exports.delete = async function (req, res, next) {
    try {
        await cloudinary.v2.uploader.destroy(req.body.image_id);
        var user = await User.deleteOne({ '_id': req.userId });
        res.send({ "message": "Xóa user thành công" });
    } catch (err) {
        next(err.message)
    }
}

module.exports.forgotPassword = async function (req, res, next) {
    try {
        var pass = Math.floor(Math.random() * 1000000);
        newPassword = bcrypt.hashSync(pass.toString(), salt);
        console.log(newPassword);
        var user = await User.updateOne({ phone: req.params.phone }, {
            $set: {
                password: newPassword
            }
        });

        var sms = client.messages.create({
            body: pass,
            to: '+' + req.params.phone,  // Text this number
            from: '+12565888023' // From a valid Twilio number
        });
        res.status(200).send({ "message": "Đã gửi mật khẩu mới về điện thoại" });
    } catch (error) {
        next(error)
    }
};

module.exports.changepassword = async function (req, res, next) {
    try {
        var user = User.updateOne({ phone: req.params.phone, password: req.body.password }, {
            $set: {
                password: bcrypt.hashSync(req.body.newPassword, salt)
            }
        });
        res.status(200).send({ "message": "Đổi mật khẩu thành công" });
    } catch (error) {
        next(error);
    }
}