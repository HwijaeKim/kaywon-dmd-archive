const express = require('express');
const router = express.Router();
const mainLayout = '../views/layouts/main.ejs'
const Post = require('../models/Post');
const asynchandler = require('express-async-handler')

// router.get('/', (req, res) => {
//     res.send('Hello World!');
// });

router.get(
    ['/', '/home'],
    asynchandler(async (req, res) => {
        const locals = {
            title: 'Home',
        };

        // 데이터베이스에 있는 데이터 모두 가져오기
        const data = await Post.find({});
        res.render('index', {locals, data, layout: mainLayout});
    })
);




router.get(
    '/post/:id',
    asynchandler(async (req, res) => {
        // 데이터 1개 가져오기
        const data = await Post.findOne({_id: req.params.id}); 
        res.render('post', {data, layout: mainLayout});
    })
);





router.get('/about', (req, res) => {
    // about.ejs를 렌더링 하는데 mainLayout 레이아웃으로 감싸기
    res.render('about', {layout: mainLayout});
});


// 임시 데이터 저장하기
// Post.insertMany ([

//     {
//         title: '제목1',
//         body: '내용1 - 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세',
//     },
//     {
//         title: '제목2',
//         body: '내용2 - 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세',
//     },
//     {
//         title: '제목3',
//         body: '내용3 - 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세',
//     },
//     {
//         title: '제목4',
//         body: '내용4 - 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세',
//     },
//     {
//         title: '제목5',
//         body: '내용5 - 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세',
//     },

// ])



// module.exports = router;