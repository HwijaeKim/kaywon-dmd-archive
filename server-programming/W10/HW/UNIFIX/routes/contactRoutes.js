const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const checkLogin = require('../middlewares/checkLogin');
const {
    getAllContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
    addContactForm, //mid add
} = require('../controllers/contactController');
const { create } = require('../models/contactModel');

router.use(cookieParser());


    router.route("/").get(checkLogin, getAllContacts);//.post(createContact);

    router.route("/newOrder").get(checkLogin, addContactForm).post(checkLogin, createContact); //mid add

    router.route("/:id").get(checkLogin, getContact).put(checkLogin, updateContact).delete(checkLogin, deleteContact);


module.exports = router;