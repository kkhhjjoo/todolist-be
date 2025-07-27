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
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://todo-list-app-demo.netlify.app',
    'https://*.netlify.app',
    'https://todo-list-demo-e11643ecaddb.herokuapp.com',
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

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
