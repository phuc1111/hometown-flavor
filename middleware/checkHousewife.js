var Housewife = require('../model/housewife.model')
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config'); // get our config file

function checkAdmin(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.headers['token'];
    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        Housewife.findById(decoded.id, { password: 0 }, function (err, user) {
            if (user.role != 'housewife') { //check admin
                return res.status(500).send('just housewife can do it');
            }
            req.userId = decoded.id;
            next();

        })

    });

}

module.exports = checkAdmin;