var User = require('../model/user.model');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
// get our config file

function checkUser(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.headers['token'];
    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });

    // verifies secret and checks exp
    jwt.verify(token, process.env.secret, function (err, decoded) {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        User.findById(decoded.id, { password: 0 }, function (err, user) {
            if (user.role != 'admin') { //check admin
                return res.status(401).send({ message: "just admin can do it" });
            }
            req.userId = decoded.id;
            next();

        })

    });

}

module.exports = checkUser;