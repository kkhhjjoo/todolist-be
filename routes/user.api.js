const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

// 회원가입 endpoint
router.post('/', userController.createUser);

// 로그인 endpoint
router.post('/login', userController.LoginWithEmail);

module.exports = router;
