require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDb = require('./config/db');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000;

// DB 연결
connectDb();

// 레이아웃과 뷰 엔진 설정
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', './views');


// 정적 파일
app.use(express.static('public'));

// 요청 본문을 파싱하는 코드
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.use(cookieParser());

app.use('/', require('./routes/main'));
app.use('/', require('./routes/admin'));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});