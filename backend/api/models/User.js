const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderSchema = require('./Order').OrderSchema;

const UserSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    phone:{
        type: Number,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    orders: [OrderSchema]
}, {
    versionKey: false 
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

