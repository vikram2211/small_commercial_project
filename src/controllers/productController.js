const productModel = require('../models/productModel');


const createProduct = async function (req, res) {
    let data = req.body;

    if (Object.keys(data) == 0) {
        return res.status(400).send({ status: false, message: "Please fill all the field." })
    }


    if (!data.name) {
        return res.status(400).send({ status: false, message: "Please give name." })
    }
    if (!data.description) {
        return res.status(400).send({ status: false, message: "Please give description." })
    }
    if (!data.category) {
        return res.status(400).send({ status: false, message: "Please give category." })
    }
    if (!data.price) {
        return res.status(400).send({ status: false, message: "Please give price." })
    }

    let product = await productModel.create(data);

    return res.status(200).send({ status: true, message: "Product created sucessfully", data: product });


}


const productList = async function (req, res) {

    const { name, category, price } = req.query;

    if (Object.keys(req.query).length === 0) {
        const products = await productModel.find().select({ name: 1, category: 1, price: 1, _id: 0 });
        return res.status(200).send({ status: true, message: "Product List", data: products });
    }


    let filter = {};

    if (name && category && price) {
        filter = { name, category, price };
    } else if (name || category || price) {
        if (name) filter = { name };
        else if (category) filter = { category };
        else if (price) filter = { price };
    } else if (name && category) {
        filter = { name, category };
    } else if (name && price) {
        filter = { name, price };
    } else if (category && price) {
        filter = (category, price)
    } else {
        return res.status(400).send({ status: false, message: "Please give valid queries" })
    }

    const filterBook = await productModel.find(filter).select({ name: 1, category: 1, price: 1 }).sort({ name: 1 });
    // console.log(filterBook);
    if (filterBook.length==0) {
        return res.status(400).send({ status: true, message: "No data found." })

    }
    return res.status(200).send({ status: true, message: "Here are your results.", data: filterBook })


}


module.exports.createProduct = createProduct;
module.exports.productList = productList;
