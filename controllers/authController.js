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
        const { email, password, confirmPassword, name, phone, role } = req.body;
        const user = await User.create({ email, name, password, confirmPassword, phone, role });

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

    const user = await User.findOne({ email });

    if (!user || !(await user?.validatePassword(password))) {
        return errorHandler(res, 400, 'email or password is not correct');
    }

    const jwt = createJWT(res, user.id);

    res.status(200).json({
        status: 'success',
        jwt,
    });
};

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return errorHandler(res, 400, 'first login after that you can access this route');
    }

    const obj = await jwt.verify(token, process.env.SECRET_JWT_KEY);

    const user = await User.findById(obj.id);

    if (!user) {
        return errorHandler(res, 400, 'token is not valid');
    }

    req.user = user;
    res.locals.user = user;
    next();
};

exports.cheack =
    (...all) =>
    (req, res, next) => {
        if (!all.includes(req.user.role))
            return errorHandler(res, 400, 'just admin can access this route');
        next();
    };
