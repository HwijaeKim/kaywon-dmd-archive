const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel')

// @desc Get all contacts
// @route Get /contacts

// 수정 전
// const getAllContacts = async(req, res) => {
//     try {
//         res.status(200).send('Contacts Page');
//     } catch(err) {
//         res.send(error.message);    
//     }
// };

// 수정 후
const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).send(contacts);
});



const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, phone } = req.body;
    if(!name || !email || !phone) {
        return res.status(400).send('필수값이 입력되지 않았습니다.');
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
    });
    res.status(201).send("Create Contacts");
});




const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    res.status(200).send(contact);
});

const updateContact = asyncHandler(async (req, res) => {
    // res.status(200).send(`Update Contact for ID: ${req.params.id}`);
    const id = req.params.id;
    const { name, email, phone } = req.body;
    const contact = await Contact.findById(id);
    if(!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }

    // 수정
    contact.name = name;
    contact.email = email;
    contact.phone = phone;

    // 저장
    contact.save();
    
    res.status(200).json(contact);
});

const deleteContact = asyncHandler(async (req, res) => {
    res.status(200).send(`Delete Contact for ID: ${req.params.id}`);
});


module.exports = {
    getAllContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
};