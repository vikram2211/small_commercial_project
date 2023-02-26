const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minLen: 5,
        maxLen: 15
    },
    address: {
        type: String,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);
