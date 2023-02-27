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

    const findProduct = await productModel.findOne({ _id: productId })
    if (!findProduct) {
        return res.status(400).send({ status: false, message: `Product doesn't exist (Entered product Id  ${productId})` })
    }

    //check for cart if it is already present or not

    const cartOfUser = await cartModel.findOne({ userId: userId })

    if (!cartOfUser) {
        let items = [{ productId: productId, quantity }];
        var cartData = {
            userId: userId,
            items: items,
            price: findProduct.price * quantity,
            category : findProduct.category
        };
        const createCart = await cartModel.create(cartData);
        return res.status(200).send({ status: true, message: "Cart created sucessfully", data: createCart });
    }

    if (cartOfUser) {
        let price = cartOfUser.price + (quantity * findProduct.price);
        let itemsArr = cartOfUser.items;


        for (let i = 0; i < itemsArr.length; i++) {
            if (itemsArr[i].productId === productId) {
                itemsArr[i].quantity += quantity

                let updatedCart = {
                    items: itemsArr,
                    price: price,
                    totalItems: itemsArr.length
                }

                let data = await cartModel.findOneAndUpdate({ _id: cartOfUser._id }, updatedCart, { new: true })
                return res.status(200).send({ status: true, message: `Product added successfully to Cart`, data: data })

            }
        }
        itemsArr.push({ productId: productId, quantity: quantity })
        let updatedCart = {
            items: itemsArr,
            price: price,
            totalItems: itemsArr.length
        }

        let data = await cartModel.findOneAndUpdate({ _id: cartOfUser._id }, updatedCart, { new: true })
        return res.status(200).send({ status: true, message: `Product added successfully to Cart`, data: data })
    }

}


const getCartDetails = async function (req, res) {
    const userId = req.params.userId;
    const validUser = await userModel.findById(userId);

    if (!validUser) { return res.status(400).send({ status: false, message: "user not found" }) }

    let verifyUser = await cartModel.findOne({ userId: userId });

    if (!verifyUser) {
        res.status(200).send({ status: true, message: "Cart not found"});
    } 

    let update = verifyUser.items
    //console.log(update);

    let itemData = update.map(({productId,quantity})=>{
        return {productId, quantity};
    })
    res.status(200).send({ status: true, msg: "success", data: { _id: verifyUser._id, userId: verifyUser.userId, items: itemData,category:verifyUser.category,price:verifyUser.price} })

}

module.exports.createCart = createCart;
module.exports.getCartDetails = getCartDetails;
