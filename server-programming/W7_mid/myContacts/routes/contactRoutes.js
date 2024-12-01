const express = require('express');
const router = express.Router();
const {
    getAllContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
    addContactForm, //mid add
} = require('../controllers/contactController');
const { create } = require('../models/contactModel');

// router
//     .route("/")
    // 모든 연락처 가져오기
    // .get((req, res) => {
    //     res.status(200).send("Contacts Page");
    // })

    // .post((req, res) => {
    //     // 새 연락처 추가하기
    //     console.log(req.body);
    //     const { name, email, phone } = req.body;
    //     if(!name || !email || !phone) {
    //         return res.status(400).send('필수값이 입력되지 않았습니다.');
    //     }
    //     res.status(201).send("Create Contacts");
    // })
    
    // router
    // .route("/:id")
    // .get((req, res) => {
    //     res.status(200).send(`View Contact for ID: ${req.params.id}`);
    // })
    // .put((req, res) => {
    //     res.status(200).send(`Update Contact for ID: ${req.params.id}`);
    // })
    // .delete((req, res) => {
    //     res.status(200).send(`Delete Contact for ID: ${req.params.id}`);
    // });

    router.route("/").get(getAllContacts);//.post(createContact);

    router.route("/newOrder").get(addContactForm).post(createContact); //mid add

    router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);


module.exports = router;