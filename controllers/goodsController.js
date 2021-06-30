const Goods = require('./../models/goodsModel');
const errorHandler = require('./errorController');

exports.createGoods = async (req, res) => {
    try {
        const good = await Goods.create(req.body);

        res.status(200).json({
            status: 'success',
            data: {
                good,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};
