const User = require('../model/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userController = {};

userController.createUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    // 이미 가입된 유저인지 확인
    const user = await User.findOne({ email }, '-createdAt -updatedAt -__v');
    if (user) {
      return res
        .status(400)
        .json({ status: 'fail', error: '이미 가입이 된 유저입니다' });
    }

    // 비밀번호 해싱
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    // 새 유저 생성
    const newUser = new User({
      email,
      name,
      password: hash,
    });

    await newUser.save();

    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error('회원가입 오류:', error);
    res.status(400).json({ status: 'fail', error: error.message });
  }
};

userController.LoginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 이메일로 유저 찾기
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: 'fail',
        error: '아이디 또는 비밀번호가 일치하지 않습니다',
      });
    }

    // 비밀번호 비교 (비동기)
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = user.generateToken();
      return res.status(200).json({
        status: 'success',
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
        token,
      });
    } else {
      return res.status(400).json({
        status: 'fail',
        error: '아이디 또는 비밀번호가 일치하지 않습니다',
      });
    }
  } catch (error) {
    console.error('로그인 오류:', error);
    res.status(400).json({ status: 'fail', error: error.message });
  }
};

module.exports = userController;
