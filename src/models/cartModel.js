const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        unique: true,
        trim: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product',
            required: true,
            trim: true, _id: 0
        },

        quantity: {
            type: Number,
            required: true,
            trim: true,
            min: 1,
        },
        _id: false
    }],
    price: {
        type: Number,
        required: true,
        trim: true
    },
    category: {
        type: String
    },                    // comment: "Holds total price of all the items in the cart"
    totalItems: {
        type: Number,
        //required: true,
        trim: true
    },                          // comment: "Holds total number of items in the cart"

}, { timestamps: true })

module.exports = mongoose.model("cart", cartSchema);