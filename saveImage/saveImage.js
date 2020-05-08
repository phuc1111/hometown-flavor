const cloudinary = require('cloudinary')
require('../middleware/cloundinary')
module.exports.save = async(req, res, next) => {
    const result = await cloudinary.v2.uploader.upload(req.file.path)
    console.log(result);
    next(result)
};