const authController = {};
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

authController.authenticate =() => {
    try{
        const tokenString = req.headers.authorization; //Bearer 어쩌구
        if (!tokenString) {
            throw new Error('invalid token');
        }
        const token = tokenString.replace('Bearer ','');
        jwt.verify(token, JWT_SECRET_KEY);

    }catch(error) {

    }
}

module.exports = authController;