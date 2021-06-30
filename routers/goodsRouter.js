const express = require('express');

const auth = require('./../controllers/authController');
const goodsController = require('./../controllers/goodsController');

const router = express.Router();

router.post(
    '/createGoods',
    auth.protect,
    auth.cheack('admin'),
    goodsController.uploadPhoto,
    goodsController.createGoods,
);

module.exports = router;
