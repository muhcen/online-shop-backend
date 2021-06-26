const User = require('./../models/userModel');

exports.registir = async (req, res) => {
    try {
        const { email, password, confirmPassword, name } = req.body;
        const user = await User.create({ email, name, password, confirmPassword });

        res.status(200).json({
            status: 'success',
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
