const cartModel = require('../models/cartModel');
const userModel = require('../models/userModel');
const productModel = require('../models/productModel');


const createCart = async function (req, res) {
    const userId = req.params.userId;
    const requestBody = req.body;

    let { quantity, productId, cartId } = requestBody;

    if (Object.keys(requestBody).length == 0) {
        return res.status(400).send({ status: false, message: "Please provide valid request body" })
    }

    if (!quantity) quantity = 1;


    const findUser = await userModel.findOne({ _id: userId })
    if (!findUser) {
        return res.status(400).send({ status: false, message: `UseriD  doesn't exist (!  Entered userId ${userId})` })
    }

    const findProduct = await productModel.findOne({ _id: productId, isDeleted: false })
    if (!findProduct) {
        return res.status(400).send({ status: false, message: `Product doesn't exist (Entered product Id  ${productId})` })
    }

    //check for cart if it is already present or not

    const cartOfUser = await cartModel.findOne({ _id: userId })

    if (!cartOfUser) {
        let items = [{ productId: productId }];
        var cartData = {
            userId: userId,
            items: items,
            price: findProduct.price * quantity
        };
        const createCart = await cartModel.create(cartData);
        return res.status(200).send({ status: true, message: "Cart created sucessfully", data: createCart });
    }

}


const getCartDetails = async function (req, res) {
    const userId = req.params.userId;
    const validUser = await userModel.findById(userId);

    if (validUser) {
        let cartDetails = await cartModel.findOne({ userId: userId });
        if (cartDetails) {
            res.status(200).send({ status: true, message: "Cart details", data: cartDetails });
        } else {
            res.status(400).send({ status: true, message: "failed to fetch cart details" });

        }

    } else {
        res.status(400).send({ status: false, message: "Invalid user" });
    }

}

module.exports.createCart = createCart;
module.exports.getCartDetails = getCartDetails;
