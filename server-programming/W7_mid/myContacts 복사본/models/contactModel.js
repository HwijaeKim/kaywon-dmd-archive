const mongoose = require('mongoose');

const userdataSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        sangtae: {
            type: String,
        },
        session: {
            type: String,
        },
        type: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Contact = mongoose.model('Userdata', userdataSchema);
module.exports = Contact;



