const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const authentication = async function (req, res, next) {
    let token;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1]
        //console.log(token)
    }

    if (!token) {
        return res.status(400).send({ status: false, message: "token is missing." })
    }

    jwt.verify(token, "secret key", function (err, decoded) {
        if (err) {
            return res.status(401).send({ status: false, message: "token invalid" })
        }
        req.userId = decoded.userId
        next();
    })
}
const authorization = async function (req, res, next) {
    let tokenUserId = req.userId
    let userId = req.params.userId

    //if (!validator.isValidObjectId(userId)) return res.status(400).send({ status: false, message: "userId is not valid" });

    //check the  user id are present in decoded token
    let User = await userModel.findOne({ _id: userId })
    if (!User) return res.status(404).send({ status: false, msg: "User not exist" })
    if (userId != tokenUserId) { return res.status(403).send({ status: false, msg: "Not Authorised!!" }) }

    next()
}

module.exports.authentication = authentication;
module.exports.authorization = authorization;