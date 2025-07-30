const authController = {};
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

authController.authenticate = (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString) {
      throw new Error('invalid token');
    }
    const token = tokenString.replace('Bearer ', '');
    const payload = jwt.verify(token, JWT_SECRET_KEY);
    req.userId = payload._id;
    next();
  } catch (error) {
    res.status(401).json({ status: 'fail', message: error.message });
  }
};

module.exports = authController;
