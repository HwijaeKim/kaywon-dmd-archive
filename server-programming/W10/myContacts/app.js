const express = require('express');
const dbConnect = require('./config/dbConnect');
const methodOverride = require("method-override");
const errorhandler = require('./middlewares/errorhandler');
const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
// load public files
app.use(express.static("./public"))
const port = 3000;

// const logger = (req, res, next) => {
//     console.log('User Logged');
//     next();
// }

// app.use(logger);

const requestTime = (req, res, next) => {
    let today = new Date(); // Date 객체 만들기
    let now = today.toLocaleTimeString(); // 현재 시간을 문자열로 바꾸기
    req.requestTime = now;  // req 객체에 requestTime 속성 추가하기
    next();
};
// app.use(requestTime)

// app.route("/contacts").get( (req, res) => {
//     const responseText =   `Hello Node! \n 요청시간: ${req.requestTime}`;
//     res.set('Content-type', 'text/plain');
//     res.send(responseText)
//     // res.status(200).send("Hello Node!");
// });

app.use(methodOverride("_method"));

dbConnect();

// contactRoutes를 통해 /contacts 라우트를 처리
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/loginRoutes"));
app.use("/contacts", require("./routes/contactRoutes"));


app.get("/test", (req, res, next) => {
    const error = new Error('테스트용 에라');
    error.status = 401;
    next(error);
});
app.use(errorhandler)


app.listen(port, () => {
    console.log(`${port}번 포트에서 서버 실행 중`);
});