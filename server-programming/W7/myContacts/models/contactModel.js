const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
            require: [true, '전화번호는 꼭 기입해 주세요.'],
        },
    },
    {
        timestamps: true,
    }
);

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;