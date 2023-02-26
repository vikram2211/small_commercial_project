const orderModel = require('../models/orderModel');
const cartModel = require('../models/cartModel');
const userModel = require('../models/userModel');

const createOrder = async function (req, res) {
    const userId = req.params.uderId;
    let requestBody = req.body;
    const { cartId } = requestBody;
}

module.exports.createOrder = createOrder;