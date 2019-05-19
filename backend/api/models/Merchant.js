const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MerchantSchema = new Schema({
    name: {
        type: String
    },
    Address: {
        type: String,
        index: true
    },
    intro: {
        type: String
    }
});

const Merchant = mongoose.model('Merchant', MerchantSchema);

module.exports = Merchant;
