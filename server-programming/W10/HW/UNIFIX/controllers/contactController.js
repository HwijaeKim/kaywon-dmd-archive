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


// mid 추가
const addContactForm = (req, res) => {
    res.render("newOrder");
}




const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { devicename, casewhat, sangtae, name, phone, email } = req.body;
    if(!devicename || !casewhat || !sangtae || !name || !phone || !email) {
        return res.status(400).send('필수값이 입력되지 않았습니다.');
    }
    const contact = await Contact.create({
        devicename,
        casewhat,
        sangtae,
        name,
        phone,
        email,
    });
    // res.status(201).send("사용자 데이터 생성됨");
    res.redirect("/contacts"); //mid add
});




const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    //mid add
    // res.status(200).send(contact);
    res.render('update', { contact: contact })
});

const updateContact = asyncHandler(async (req, res) => {
    // res.status(200).send(`Update Contact for ID: ${req.params.id}`);
    const id = req.params.id;
    const { devicename, casewhat, sangtae, name, phone, email } = req.body;
    const contact = await Contact.findById(id);
    if(!contact) {
        res.status(404);
        throw new Error('사용자 데이터 찾을 수 없음');
    }

    // 수정
    contact.devicename = devicename;
    contact.casewhat = casewhat;
    contact.sangtae = sangtae;
    contact.name = name;
    contact.email = email;
    contact.phone = phone;

    // 저장
    contact.save();
    
    //mid add
    // res.status(200).json(contact); 
    res.redirect("/contacts");
});

const deleteContact = asyncHandler(async (req, res) => {
    //mid add
    // const contact = await Contact.findById(req.params.id);
    // if(!contact) {
    //     res.status(404);
    //     throw new Error("사용자 데이터를 찾을 수 없음");
    // }
    // await Contact.deleteOne({ _id: req.params.id });
    // res.status(200).send(`해당 사용자 ID 삭제됨: ${req.params.id}`)
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect("/contacts")
});


module.exports = {
    getAllContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
    addContactForm,
};