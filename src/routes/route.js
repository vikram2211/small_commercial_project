const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');
const {authentication, authorization} = require('../middleware/auth');


router.post('/register', userController.registerUser);
router.post('/login',userController.loginUser);

router.post('/createProduct', productController.createProduct);
router.get('/getProduct', productController.productList);

router.post('/users/:userId/cart',authentication, cartController.createCart);
router.get('/users/:userId/cart', authentication,authorization,cartController.getCartDetails);

router.post('/users/:userId/createOrder', orderController.createOrder);
router.get('/users/:userId/getList', orderController.orderList);



module.exports = router;
