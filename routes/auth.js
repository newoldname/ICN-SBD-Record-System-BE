const express = require('express');
const passport = require('passport');

// const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
// const { checkEmail, join, login, logout } = require('../services/auth/auth.js');

const router = express.Router();

router.get('/', (req, res, next) => {res.send("hi, im auth")});

// router.post('/join', isNotLoggedIn, join); 

// router.post('/login', isNotLoggedIn, login);

// router.get('/logout', isLoggedIn, logout);

module.exports = router;
