require('dotenv').config();
module.exports = {
    mongoURI: process.env.MONGO_URI,
    secretOrPrivateKey: 'secret',
    sessionSecretKey: process.env.SESSION_SECRET
};