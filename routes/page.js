const express = require('express');
const authRouter = require('./auth')
const issueRouter = require('./issue')

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.use('/auth', authRouter);

router.use('/issue', issueRouter);

module.exports = router;