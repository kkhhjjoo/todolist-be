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
