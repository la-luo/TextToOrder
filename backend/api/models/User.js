const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    username: {
        type: String,
        index: true
    },
    password: {
        type: String,
        require: true
    },
    orders: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

