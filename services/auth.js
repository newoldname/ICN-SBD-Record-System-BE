const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

exports.join = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.status(401).json({
        code: 401,
        message: "이미 가입된 이메일입니다."
      });
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email: email,
      password: hash,
    });
    return res.status(201).json({
        code: 201,
        message: "회원 가입이 완료되었습니다."
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
}

exports.login = (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.status(401).json({
        code: 401,
        message: "이메일과 비밀번호가 일치하지 않습니다."
      });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.status(200).json({
        code: 200,
        message: "로그인 성공."
      });
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};

exports.logout = (req, res) => {
  req.logout(() => {
    return res.status(200).json({
        code: 200,
        message: "로그아웃 성공."
      });
  });
};