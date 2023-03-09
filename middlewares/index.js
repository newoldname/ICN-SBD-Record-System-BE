exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      return res.status(405).json({
        code: 405,
        message: '로그인 필요'
      });
    }
  };
  
  exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
      next();
    } else {
      return res.status(405).json({
        code: 405,
        message: '로그인한 상태입니다'
      });
    }
  };