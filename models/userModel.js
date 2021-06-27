const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
    phone: {
        type: String,
        required: [true, 'user must have phone'],
        minlength: 11,
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
    rule: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
});

UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = undefined;
    next();
});

UserSchema.method({
    validatePassword: async function (password) {
        return await bcrypt.compare(password, this.password);
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
