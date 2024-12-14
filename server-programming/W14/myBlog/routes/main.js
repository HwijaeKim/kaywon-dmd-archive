const express = require("express");
const router = express.Router();
const mainLayout = "layouts/main";
const Post = require("../models/Post");
// const Image = require("../models/Images");
const asynchandler = require("express-async-handler");

// const path = require('path');
// const fs = require('fs');
// const multer = require('multer');


// "/home" 라우트
router.get(
  ["/", "/home"],
  asynchandler(async (req, res) => {
    const locals = {
      title: "Home",
    };
    const data = await Post.find().sort({ updatedAt: "desc", createdAt: "desc" });
    res.render("index", { locals, data, layout: mainLayout });
  })
);


router.get('/about', (req, res) => {
  // about.ejs를 렌더링 하는데 mainLayout 레이아웃으로 감싸기
  res.render('about', {layout: mainLayout});
});

// "/upload" 라우트
// router.get(
//   "/upload",
//   asynchandler(async (req, res) => {
//     const locals = {
//       title: "이미지 업로드",
//     };
//     res.render("addImage", { layout: mainLayout });
//   })
// );

// GET /add
// Admin - Add Post
router.get(
  "/upload",
  asynchandler(async (req, res) => {
    const locals = {
      title: "이미지 업로드",
    };
    res.render("addImage", {
      locals,
      layout: mainLayout,
    });
  })
);

// router.get(
//   "/upload/:id",
//   asynchandler(async (req, res) => {
//     const image = await Image.findOne({ _id: req.params.id }); // 데이터를 'post'로 가져옴
//     if (!image) {
//       return res.status(404).send("게시물을 찾을 수 없습니다.");
//     }
//     res.render("addImage", { image, layout: mainLayout }); // post 객체로 전달
//   })
// );

// router.get(
//   "/uploaded",
//   asynchandler(async (req, res) => {
//     const locals = {
//       title: "이미지 업로드",
//     };
//     res.render("addImage", {
//       locals,
//       layout: mainLayout,
//     });
//   })
// );




// GET /post/:id
// 게시물 상세 보기
router.get(
  "/post/:id",
  asynchandler(async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id }); // 데이터를 'post'로 가져옴
    if (!post) {
      return res.status(404).send("게시물을 찾을 수 없습니다.");
    }
    res.render("post", { post, layout: mainLayout }); // post 객체로 전달
  })
);

module.exports = router;