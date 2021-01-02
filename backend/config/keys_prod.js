require('dotenv').config();
module.exports = {
    mongoURI: process.env.MONGO_URI,
    secretOrPrivateKey: process.env.PRIVATE_KEY,
    sessionSecretKey: process.env.SESSION_SECRET
};