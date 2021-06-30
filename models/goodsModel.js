const mongoose = require('mongoose');

const GoodsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'goods must have name'],
        minlength: 3,
    },
    price: {
        type: Number,
        required: [true, 'goods must have price'],
    },
    color: {
        type: String,
        required: [true, 'goods must have color'],
    },

    brand: {
        type: String,
        required: [true, 'goods must have brand'],
    },
    size: {
        type: String,
        enum: ['small', 'medium', 'large'],
        default: 'small',
    },
    pictures: {
        type: [String],
    },
});

const Goods = mongoose.model('Goods', GoodsSchema);

module.exports = Goods;
