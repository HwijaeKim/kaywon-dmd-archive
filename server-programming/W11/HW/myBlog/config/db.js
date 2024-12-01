const mongoose = require('mongoose');
const asynchandler = require('express-async-handler');
require('dotenv').config();

const connectDb = asynchandler(async() => {
    // .env 파일에 있는 MONGODB_URI값을 사용해 접속
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    // DB 연결 성공시 터미널에 출력
    console.log(`DB connected: ${connect.connection.host}`);
});

module.exports = connectDb;