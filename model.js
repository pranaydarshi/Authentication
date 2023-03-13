const mongoose = require('mongoose');
const Registeruser = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Registeruser', Registeruser)// first arugument is model name and second argument is schema name