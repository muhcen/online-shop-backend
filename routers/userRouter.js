const express = require('express');
const passport = require('passport');

const auth = require('./../controllers/authController');

const router = express.Router();

router.post('/registir', auth.registir);

router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
    }),
);

module.exports = router;
