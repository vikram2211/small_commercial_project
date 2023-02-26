const express = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');


const registerUser = async function (req, res) {
    let data = req.body;
    let { fname, lname, phone, email, password, address } = data


    if (Object.keys(data) == 0) {
        return res.status(400).send({ status: false, message: "Please fill all the field." })
    }

    if (!fname) {
        return res.status(400).send({ status: false, message: "Please fill fname field." })
    }
    if (!lname) {
        return res.status(400).send({ status: false, message: "Please fill lname field." })
    }


    if (!phone) {
        return res.status(400).send({ status: false, message: "Please fill phone field." })
    }

    let mobile = await userModel.findOne({ phone });

    if (mobile) {
        return res.status(400).send({ status: false, message: "Phone no is already registered." })

    }


    if (!email) {
        return res.status(400).send({ status: false, message: "Please fill email field." })
    }

    let checkEmail = await userModel.findOne({ email });
    if (checkEmail) {
        return res.status(400).send({ status: false, message: "email no is already registered." })
    }


    if (!password) {
        return res.status(400).send({ status: false, message: "Please fill password field." })
    }


    let checkPassword = await userModel.findOne({ password });
    if (checkPassword) {
        return res.status(400).send({ status: false, message: "password is already registered." })
    }

    if (!address) {
        return res.status(400).send({ status: false, message: "Please fill address field." })
    }


    const user = await userModel.create(data);
    return res.status(200).send({ status: true, message: "User created sucessfully", data: user })

}



const loginUser = async function (req, res) {
    let userName = req.body.email;
    let password = req.body.password;


    if (!(userName && password)) {
        return res.status(400).send({ status: false, message: "Please provide data" })
    }

    let checkUser = await userModel.findOne({ email: userName, password: password }).select({ _id: 1 });
    //console.log(checkUser);

    if (!checkUser) {
        return res.status(400).send({ status: false, message: "email or password is not correct." })
    }

    let token = jwt.sign({
        userId: checkUser._id
    }, "secret key")
    return res.status(200).send({ status: true, message: "User loged-In sucessfully", data: { _id: checkUser._id, token: token } })

}



module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;
