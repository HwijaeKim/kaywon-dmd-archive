const express = require('express');
const router = express.Router();
const adminLayout = '../views/layouts/admin';
const adminLayout2 = '../views/layouts/admin-nologout';
const asynchandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Post = require('../models/Post');

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

/** 
 * GET /admin
 * Admin page
 */

router.get('/admin', (req, res) => {
    // res.send('Admin page');
    const locals = {
        title: '관리자 페이지', // 브라우저 탭에 표시할 내용
    };

    // adminLayout을 사용해서 admin/index.ejs 렌더링 하기
    res.render('admin/index', { locals, layout: adminLayout2 })
});



router.post(
    '/admin',
    asynchandler(async (req, res) => {
        const { username, password } = req.body;

        // if (username === 'admin' && password === 'admin') {
        //     res.send('Success');
        // } else {
        //     res.send('Fail');
        // }

        // 사용자 이름으로 사용자 찾기
        const user = await User.findOne({ username });

        // 일치하는 사용자가 없으면 401 오류 표시
        if(!user) {
            return res.status(401).json({ message: '일치하는 사용자가 없습니다.'});
        }
        // 입력한 비밀번호와 DB에 저장된 비밀번호 비교
        const isValidPassword = await bcrypt.compare(password, user.password);

        // 비밀번호가 일치하지 않으면 401 오류 표시
        if(!isValidPassword) {
            return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.'});
        }
        // JWT 토큰 생성
        const token = jwt.sign({ id: user._id }, jwtSecret);

        // 토큰을 쿠키에 저장
        res.cookie('token', token, { httpOnly: true });

        // 로그인에 성공하면 젗네 계시물 목록 페이지로 이동
        res.redirect('/allPosts');
    })
);


/** 
 * GET /register
 * Register administator
 */

router.get(
    '/register', asynchandler(async (req, res) => {
        res.render('admin/index', { layout: adminLayout2 });
    })
);



/** 
 * POST /register
 * Register administator
 */

// router.post(
//     '/register',
//     asynchandler(async (req, res) => {
//         // res.send('Register');
//         // 비밀번호 암호화
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);
//         const user = await User.create({
//             username: req.body.username,
//             // 암호화된 비밀번호
//             password: hashedPassword,
//         });
//         res.json(`user created: ${user}`)
//     })
// );

module.exports = router;