const express = require('express');
// const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
// const {createNewPost, getBoardList, getBoardDatail, updatePost, deletePost, getSchoolNotiListPreview, getUserMajors} = require("../services/board/boardService")

const router = express.Router();

router.get("/", (req, res, next) => {res.send("hi, im issue")})

module.exports = router;