const express = require('express');
// const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
// const {createNewPost, getBoardList, getBoardDatail, updatePost, deletePost, getSchoolNotiListPreview, getUserMajors} = require("../services/board/boardService")

const router = express.Router();
const {addNewIssue, findAllEventToday, getTodayIssuesText} = require('../services/issue')


// router.get("/", (req, res, next) => {res.send("hi, im issue")})

//이슈 추가
router.post("/addios", addNewIssue)

//이슈 조회
router.get("/readios", findAllEventToday)

//이슈 삭제

//이슈로 오늘의 텍스트 추가
router.get("/resultios", getTodayIssuesText)

module.exports = router;