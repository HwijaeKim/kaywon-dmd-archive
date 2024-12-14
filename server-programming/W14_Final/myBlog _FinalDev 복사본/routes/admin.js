const express = require("express");
const router = express.Router();
const adminLayout = "layouts/admin";
const adminLayout2 = "layouts/admin-nologout";
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Comment = require("../models/News");

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// 이미지 업로드 관련
// const multer = require('multer');
// const Image = require('../models/Article');
// const path = require('path');
// const fs = require('fs');




// Check Login
const checkLogin = async (req, res, next) => {
  const token = req.cookies.token; // 쿠키 정보 가져오기

  // 토큰이 없다면
  if (!token) {
    return res.redirect("/admin");
  }

  // 토큰이 있다면 토큰을 확인하고 사용자 정보를 요청에 추가
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId; // res.userId가 아닌 req.userId에 저장
    next();
  } catch (error) {
    return res.redirect("/admin");
  }
};
// GET /logout
// Admin Logout
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/"); // 루트 페이지로 이동
});

// GET /admin
// 관리자 페이지
router.get("/admin", (req, res) => {
  const locals = {
    title: "관리자 페이지",
  };
  res.render("admin/index", { locals, layout: adminLayout2 });
});

// GET /register
// 회원가입 페이지
router.get(
  "/register",
  asyncHandler(async (req, res) => {
    res.render("admin/register", { layout: adminLayout2 });
  })
);

// POST /admin
// 관리자 페이지 로그인
router.post(
  "/admin",
  asyncHandler(async (req, res) => {
    const { username, password } = req.body; // req.body에서 username과 password를 가져옴

    // 사용자 이름으로 사용자 찾기
    const user = await User.findOne({ username });

    // 일치하는 사용자가 없으면 에러 메시지 출력
    if (!user) {
      return res.status(401).json({ message: "일치하는 사용자가 없습니다." });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);

    // 비밀번호가 일치하지 않으면 에러 메시지 출력
    if (!isValidPassword) {
      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }

    // JWT 토큰 생성
    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    // JWT 토큰을 쿠키에 저장
    res.cookie("token", token, {
      httpOnly: true,
    });

    // 로그인에 성공하면 전체 게시물 목록 페이지로 이동
    res.redirect("/allPosts");
  })
);

// GET /allPosts
// 전체 게시물 목록 페이지
// router.get(
//   "/allPosts",
//   checkLogin,
//   asyncHandler(async (req, res) => {
//     const locals = {
//       title: "전체 게시물",
//     };
//     const data = await Comment.find().sort({ updatedAt: "desc", createdAt: "desc" });
//     res.render("admin/allPosts", {
//       locals,
//       data,
//       layout: adminLayout,
//     });
//   })
// );



router.get(
  "/allPosts",
  checkLogin,
  asyncHandler(async (req, res) => {
    const locals = {
      title: "최신 테크 뉴스",
    };
    const comments = await Comment.find(); 
    res.render("admin/allPosts", { comments: comments, layout: adminLayout });
  })
);

router.delete(
  "/:id",
  checkLogin,
  asyncHandler(async (req, res) => {
    await Comment.deleteOne({_id: req.params.id});
    res.redirect('allPosts');
  })
);




// 업로드 폴더 확인 후 생성
// const uploadDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
// }


// // Multer 저장 설정 (디스크 저장 방식)
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) { // callback
//       cb(null, uploadDir);
//   },
//   filename: function(req, file, cb) {
//       cb(null, Date.now() + path.extname(file.originalname));
//       // 파일 이름을 현재 시간과 확장사로 지정
//   }
// });


// // Multer 미들웨어 설정
// const upload = multer({ storage: storage });

// // 업로드된 파일을 정적 파일로 제공
// router.use('/allPosts', express.static(uploadDir));

// // 파일 업로드 폼을 EJS 템플릿으로 렌더링
// router.get('/allPosts', (req, res) => {
//     // views/index.ejs 파일을 렌더링
//     res.render('addImage');
// });


// // 파일 업로드를 처리하는 라우터
// router.post('/allPosts', upload.single('file'), (req, res) => {
//   if (!req.file) {
//       return res.status(400).send('파일이 업로드 되지 않았습니다.');
//   }

//   const { title, body } = req.body;

//   console.log('파일 정보:', req.file);
//   console.log('제목:', title);
//   console.log('내용:', body);


//      // MongoDB
//  const newImage = new Image({
//   title: title,
//   body: body,
//   filename: req.file.filename,
//   path: path.join('uploads', req.file.filename),
// });

// newImage.save()
//   .then(() => {
//      console.log('파일 업로드 완료');
//      // EJS에 파일과 제목, 내용을 모두 전달
//      res.render('admin/allPosts', { 
//       uploadedFile: { 
//         title, 
//         body, 
//         filename: req.file.filename, 
//         path: req.file.path 
//       } 
//     });
//   })
//   .catch((err) => {
//      console.error('오류:', err);
//      res.status(500).send('파일 업로드 오류');
//   });


// });












/**
 * DELETE /delete/:id
 * Admin - Delete Post
 */
router.delete(
  "/delete/:id",
  checkLogin,
  asyncHandler(async (req, res) => {
    await Post.deleteOne({_id: req.params.id});
    res.redirect('/allPosts');
  })
);









router.get('/register', (req, res) => {
  res.render('admin/register', {layout: adminLayout2});
})


router.post(
  '/register',
  asyncHandler(async (req, res) => {
    const {username, password, password2} = req.body;
    if(password === password2) {
        // bcrypt를 사용해 비밀번호를 암호화
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        // 사용자 이름과 암호화된 비밀번호를 사용해서 새 사용자를 생성
        const user = await User.create({ username, password: hashedPassword});
        // 성공메시지 출력
        res.status(201).json({message: "Register successful", user})
    }
    else {
        res.send("Register Failed")
    }
  })
)





module.exports = router;
