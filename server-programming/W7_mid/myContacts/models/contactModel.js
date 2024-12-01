const mongoose = require('mongoose');

const userdataSchema = new mongoose.Schema(
    {
        devicename: {
            type: String,
        },
        casewhat: {
            type: String,
        },
        sangtae: {
            type: String,
        },
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Contact = mongoose.model('Userdata', userdataSchema);
module.exports = Contact;



