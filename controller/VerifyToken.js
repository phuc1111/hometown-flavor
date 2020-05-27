var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config'); // get our config file

function verifyToken(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.headers['token'];
    if (!token)
        return res.status(403).send({ auth: false, message: 'Chưa có token' });

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Sai token, vui lòng cung cấp token hợp lệ' });
        req.userId = decoded.id;
        next();
    });

}

module.exports = verifyToken;