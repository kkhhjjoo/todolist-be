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

// CORS 설정을 더 구체적으로 설정
const allowedOrigins = [
  'http://localhost:4000',
  'https://todo-list-app-demo.netlify.app', // 넷리파이 앱 URL
  'https://todo-list-demo-e11643ecaddb.herokuapp.com',
];

const corsOptions = {
  origin: function (origin, callback) {
    // 개발 환경에서는 origin이 null일 수 있음 (Postman 등)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};
app.use(cors(corsOptions));

// OPTIONS 요청 처리
app.options('/*', cors(corsOptions));

// 루트 경로 추가
app.get('/', (req, res) => {
  res.json({ message: 'Todo List API Server is running!' });
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
});
