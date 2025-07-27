const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
require('dotenv').config();
const MONGODB_URI_PROD =
  process.env.MONGODB_URI_PROD || 'mongodb://localhost:27017/todolist';
console.log('mongoouri', MONGODB_URI_PROD);

const app = express();
app.use(bodyParser.json());

// CORS 설정 - 모든 origin 허용 (개발 및 프로덕션)
app.use(
  cors({
    origin: true,
    credentials: false,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// OPTIONS 요청 처리
app.options('*', cors());

// 루트 경로 추가
app.get('/', (req, res) => {
  console.log('Root endpoint accessed');
  res.json({
    message: 'Todo List API Server is running!',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api', indexRouter);
const mongoURI = MONGODB_URI_PROD;

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log('mongoose connected');
  })
  .catch((err) => {
    console.log('DB connection fail', err);
    console.log('Starting server without database connection...');
  });

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server on ${port}`);
  console.log('CORS enabled for all origins');
});
// 1. 회원가입
// 유저가 이메일, 패스워드, 유저이름을 입력해서 보냄
// 받은 정보를 저장함(데이터 베이스 모델 필요)
// 패스워드를 암호화 시켜서 저장

//1. 라우터
//2. 모델
//3. 데이터를 저장(이미 가입된 유저 유무, 패스워드 암호화)
//4. 응답을 보낸다

//2. 로그인
// 이메일 패스워드를 입력해서 보냄
// 데이터 베이스에 해당 이메일과 패스워드를 가진 유저가 있는지 확인
// 없으면 로그인 실패
// 있다면? 유저정보 + 토큰
// 프론트엔드에서는 이 정보를 저장

//1. 라우터 설정
//2. 이메일 패스워드 정보 읽어오기
//3. 이메일을 가지고 유저정보 가져오기
//4. 이 유저에 db에 있는 패스워드와 프른트엔드가 보낸 패스워드가 같은지 비교
//5. 맞다! 그러면 토큰 발행
//6. 틀리면 에러메세지 보냄
//7. 응답으로 유저정보 + 토큰 보냄