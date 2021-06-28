const User = require('./../models/userModel');
const errorHandler = require('./errorController');
const jwt = require('jsonwebtoken');

const createJWT = (res, id) => {
    const token = jwt.sign({ id }, process.env.SECRET_JWT_KEY, {
        expiresIn: process.env.EXPIRE_IN,
    });
    res.cookie('jwt', token, {
        expiresIn: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httponly: true,
    });
    return token;
};

exports.registir = async (req, res) => {
    try {
        const { email, password, confirmPassword, name, phone } = req.body;
        const user = await User.create({ email, name, password, confirmPassword, phone });

        const jwt = createJWT(res, user.id);
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

    console.log(await user.validatePassword(password));

    if (!user || !(await user?.validatePassword(password))) {
        return errorHandler(res, 400, 'email or password is not correct');
    }

    const jwt = createJWT(res, user.id);
    console.log(res.cookie.name);
    res.status(200).json({
        status: 'success',
        jwt,
    });
};
