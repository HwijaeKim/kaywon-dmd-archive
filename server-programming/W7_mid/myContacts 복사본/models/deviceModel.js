const mongoose = require('mongoose');

const devicedataSchema = new mongoose.Schema(
    {
        nickname: {
            type: String,
            required: true,
        },
        device: {
            type: String,
        },
        date: {
            type: String,
        },
        category: {
            type: String,
        },
        description: {
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

const Contact = mongoose.model('Devicedata', deviceSchema);
module.exports = Contact;



