const mongoose = require('mongoose');

const orderdataSchema = new mongoose.Schema(
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

const Contact = mongoose.model('Orderdata', orderdataSchema);
module.exports = Contact;



