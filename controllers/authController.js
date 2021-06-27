const User = require('./../models/userModel');
const errorHandler = require('./errorController');
const jwt = require('jsonwebtoken');

const createJWT = (email) => {
    return jwt.sign(email, process.env.SECRET_JWT_KEY);
};

exports.registir = async (req, res) => {
    try {
        const { email, password, confirmPassword, name, phone } = req.body;
        const user = await User.create({ email, name, password, confirmPassword, phone });

        const jwt = createJWT(user.email);
        res.status(200).json({
            status: 'success',
            jwt,
            data: {
                user,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return errorHandler(res, 400, 'plz, input email and password');
    }

    const user = await User.findOne({ email });
    console.log(await user.validatePassword(password));

    if (!user || !(await user?.validatePassword(password))) {
        return errorHandler(res, 400, 'email or password is not correct');
    }

    const jwt = createJWT(user.email);
    res.status(200).json({
        status: 'success',
        jwt,
    });
};
