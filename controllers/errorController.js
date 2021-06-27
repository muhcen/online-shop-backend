module.exports = (res, status, msg) => {
    res.status(status).json({
        status: 'fail',
        message: msg,
    });
};
