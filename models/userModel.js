const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'user must have name'],
        minlength: 4,
    },
    email: {
        type: String,
        required: [true, 'user must have email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'user must have password'],
    },
    confirmPassword: {
        type: String,
        minLength: 8,
        required: [true, 'you must confirm the password'],
        validate: {
            validator: function (v) {
                return v === this.password;
            },
            message: 'confirmpassword with password not the same',
        },
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
