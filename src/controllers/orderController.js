const orderModel = require('../models/orderModel');
const cartModel = require('../models/cartModel');
const userModel = require('../models/userModel');

const createOrder = async function (req, res) {
    const userId = req.params.uderId;
    let requestBody = req.body;
    const { cartId } = requestBody;

    if (Object.keys(requestBody).length === 0) {
        return res.status(400).send({ status: false, message: "Give deatils to place the order." })
    }

    const findUser = await userModel.find({ _id: userId });
    if (!findUser) {
        return res.status(400).send({ status: false, message: "User does not exist." })

    }
    const findCart = await cartModel.find({ _id: cartId, userId: userId });

    if (findCart) {
        let items = [{ productId: findCart.productId, quantity: findCart.quantity }]
        const orderPlaced = {
            userId: userId,
            items: items,
            totalPrice: findCart.price
        };

        const savedOrder = await orderModel.create(orderPlaced);

        return res.status(200).send({ status: true, message: "Order placed sucessfully", data: savedOrder });

    } else {

        return res.status(400).send({ status: false, message: "User or cart does not exist." })

    }


}


const orderList = async function (req, res) {
     const userId = req.params.userId;
    const data = req.body;

    const { orderId } = data;

    const checkUser = await userModel.find({ _id: userId });
    if (!checkUser) {
        return res.status(400).send({ status: false, message: "User does not exist." })

    }
    const checkOrder = await orderModel.find({ _id: orderId });

    if (!checkOrder) {
        return res.status(400).send({ status: false, message: "not valid." })

    }

    const orderData = await orderModel.find().select({ _id: 1 });

    return res.status(200).send({ status: true, message: "Order details.", data: orderData });


}

module.exports.createOrder = createOrder;
module.exports.orderList = orderList;
