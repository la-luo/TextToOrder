const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MerchantSchema = new Schema({
    storename: {
        type: String,
        index: true
    },
    address: {
        type: String,
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        index: true
    },
    password: {
        type: String
    }
});

const Merchant = mongoose.model('Merchant', MerchantSchema);

module.exports = Merchant;
