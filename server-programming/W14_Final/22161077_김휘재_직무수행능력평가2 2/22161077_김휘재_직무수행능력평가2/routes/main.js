const express = require("express");
const router = express.Router();
const mainLayout = "layouts/main";
const Comment = require("../models/News");
const Contact = require('../models/Order');
const Article = require('../models/Article');
// const Image = require("../models/Images");
const asynchandler = require("express-async-handler");

// const path = require('path');
// const fs = require('fs');
// const multer = require('multer');


// "/home" 라우트
router.get(
  ["/", "/order"],
  asynchandler(async (req, res) => {
    const locals = {
      title: "Order",
    };
    const contacts = await Contact.find();
    res.render("order", { contacts: contacts, layout: mainLayout });
  })
);

router.get('/newOrder', (req, res) => {
  res.render('newOrder', {layout: mainLayout});
})

router.post(
  "/newOrder",
  asynchandler(async (req, res) => {
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
    res.redirect("/order"); //mid add
  })
)


router.get(
  "/order/:id",
  asynchandler(async (req, res) => {
    const locals = {
      title: "주문수정"
    };

    const contact = await Contact.findById(req.params.id);
    //mid add
    // res.status(200).send(contact);
    res.render('update', { contact: contact, layout: mainLayout });
  })
)



router.put(
  "/order/:id",
  asynchandler(async (req, res) => {
    const locals = {
      title: "주문수정"
    };

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
    res.redirect("/order");
  })
)


router.delete(
  "/delete/:id",
  asynchandler(async (req, res) => {
    await Contact.deleteOne({_id: req.params.id});
    res.redirect('/order');
  })
);















router.get(
  "/news",
  asynchandler(async (req, res) => {
    const locals = {
      title: "최신 테크 뉴스",
    };
    const comments = await Comment.find().sort({ updatedAt: "desc", createdAt: "desc" }); 
    const articles = await Article.find().sort({ updatedAt: "desc", createdAt: "desc" });
    res.render("news", { comments: comments, articles: articles, layout: mainLayout });
  })
);

router.post(
  "/news",
  asynchandler(async (req, res) => {
    const { nickname, body, createdAt } = req.body;
    if (!nickname || !body) {
      return res.status(400).send('필수값이 입력되지 않았습니다.');
    }
    const comment = await Comment.create({
      nickname,
      body,
      createdAt,
    });
    res.redirect("/news");
  })
);






// router.get(
//   "/news",
//   asynchandler(async (req, res) => {
//     const locals = {
//       title: "최신 테크 뉴스",
//     };
//     const articles = await Article.find();
//     res.render("news", { article: article, layout: mainLayout });
//   })
// );







module.exports = router;