// var Admin = require('../model/admin.model');

// var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
// var bcrypt = require('bcryptjs');
// var config = require('../config');
// var salt = bcrypt.genSaltSync(10);


// module.exports.login = function (req, res) {

//     Admin.findOne({ user: req.body.user }, function (err, admin) {
//         if (err) return res.status(500).send('Error on the server.');
//         if (!admin) return res.status(404).send('No user found.');

//         // check if the password is valid
//         var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
//         if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

//         // if user is found and password is valid
//         // create a token
//         var token = jwt.sign({ id: admin._id }, config.secret, {
//             expiresIn: 7200 // expires in 2 hours
//         });

//         // return the information including token as JSON
//         res.status(200).send({ auth: true, token: token });
//     });

// };

// module.exports.logout = function (req, res) {
//     res.status(200).send({ auth: false, token: null });
// };

// module.exports.register = async function (req, res, next) {
//     try {
//         req.body.password = bcrypt.hashSync(req.body.password, salt);
//         var admin = await Admin.create(req.body);
//         res.status(200).send(admin);
//     } catch (err) {
//         console.log(err);
//         next(err.message)
//     }

// };
