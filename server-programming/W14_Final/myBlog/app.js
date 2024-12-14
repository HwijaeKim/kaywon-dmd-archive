require('dotenv').config({ path: './path/to/.env' });
const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const connectDb = require("./config/db"); // DB 연결 함수 가져오기
const cookieParser = require("cookie-parser"); // 쿠키 파서 가져오기
const methodOverride = require("method-override")
// const mainLayout = "../views/layouts/main.ejs";


// 이미지 업로드 관련
const multer = require('multer');
const Image = require('./models/Images');
const path = require('path');
const fs = require('fs');


const app = express();
const port = process.env.PORT || 3000 // .env에 포트가 없으면 3001번 포트로 설정

connectDb(); // DB 연결 함수 실행

app.use(express.json()); // JSON 요청 본문 파싱
app.use(express.urlencoded({extended: true})); // URL-encoded 요청 본문 파싱

app.use(methodOverride("_method"));


/**
 * /upload 라우트를 위한 layout 지정
 * 기본적으로 expressEjsLayouts는 layout을 찾으려 하므로
 * POST시 /views/layout.ejs를 찾으려 헀을 것이다.
 * 
 * 하지만 layout.ejs는 존재하지 않기 때문에 기본 layout경로를 설정해줄 필요가 있다.
 * main.js에서 한 번에 관리하는 것은 지속적으로 실패 중
 */
app.set('layout', 'layouts/main');
app.use(expressEjsLayouts); // ejs 레이아웃 사용
app.use(cookieParser()); // 쿠키 파서 사용


app.set("view engine", "ejs"); // ejs 사용
app.set("views", path.join(__dirname, "/views")); // views 폴더 설정


app.use(express.static(__dirname + "/public")); // public 폴더 설정
app.use("/", require("./routes/main")); // 루트 경로로 들어오면 main.js로 이동
app.use("/upload", require("./routes/main"));


app.use("/", require("./routes/admin")); // /admin 경로로 들어오면 admin.js로 이동


// 업로드 폴더 확인 후 생성
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}


// Multer 저장 설정 (디스크 저장 방식)
const storage = multer.diskStorage({
  destination: function (req, file, cb) { // callback
      cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
      // 파일 이름을 현재 시간과 확장사로 지정
  }
});


// Multer 미들웨어 설정
const upload = multer({ storage: storage });

// 업로드된 파일을 정적 파일로 제공
app.use('/uploads', express.static(uploadDir));

// 파일 업로드 폼을 EJS 템플릿으로 렌더링
app.get('/upload', (req, res) => {
    // views/index.ejs 파일을 렌더링
    res.render('addImage');
});


// 파일 업로드를 처리하는 라우터
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
      return res.status(400).send('파일이 업로드 되지 않았습니다.');
  }

  const { title, body } = req.body;

  console.log('파일 정보:', req.file);
  console.log('제목:', title);
  console.log('내용:', body);


     // MongoDB
 const newImage = new Image({
  title: title,
  body: body,
  filename: req.file.filename,
  path: path.join('uploads', req.file.filename),
});

newImage.save()
  .then(() => {
     console.log('파일 업로드 완료');
     // EJS에 파일과 제목, 내용을 모두 전달
     res.render('addImage', { 
      uploadedFile: { 
        title, 
        body, 
        filename: req.file.filename, 
        path: req.file.path 
      } 
    });
  })
  .catch((err) => {
     console.error('오류:', err);
     res.status(500).send('파일 업로드 오류');
  });


});





app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
