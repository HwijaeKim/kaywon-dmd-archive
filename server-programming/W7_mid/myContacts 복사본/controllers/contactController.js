const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel')
const path = require("path");

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
    // const users = [
    //     { name: "John", email: "john@aaa.bbb", phone: "123456789"},
    //     { name: "Craig", email: "craig@aaa.bbb", phone: "67891234"},
    // ]
    // res.status(200).send("<h1 style='color: green'>Contacts Page</h1>");
    // const filePath = path.join(__dirname, "../assets", "getAll.html")
    // res.sendFile(filePath);
    res.render("index", { contacts: contacts });
});



const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, phone, sangtae, session, type } = req.body;
    if(!name || !email || !phone || !sangtae || !session || !type) {
        return res.status(400).send('필수값이 입력되지 않았습니다.');
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        sangtae,
        session,
        type,
    });
    res.status(201).send("사용자 데이터 생성됨");
});




const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    res.status(200).send(contact);
});

const updateContact = asyncHandler(async (req, res) => {
    // res.status(200).send(`Update Contact for ID: ${req.params.id}`);
    const id = req.params.id;
    const { name, email, phone, sangtae, session, type } = req.body;
    const contact = await Contact.findById(id);
    if(!contact) {
        res.status(404);
        throw new Error('사용자 데이터 찾을 수 없음');
    }

    // 수정
    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    contact.sangtae = sangtae;
    contact.session = session;
    contact.type = type;

    // 저장
    contact.save();
    
    res.status(200).json(contact);
});

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("사용자 데이터를 찾을 수 없음");
    }
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).send(`해당 사용자 ID 삭제됨: ${req.params.id}`)
});


module.exports = {
    getAllContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
};