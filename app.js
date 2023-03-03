const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const pageRouter = require("./routes/page");
const { sequelize } = require("./models");

const app = express();
app.set("port", process.env.PORT || 8001);
app.set("view engine", "html");

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

const reloadDB = true;

sequelize
  .sync({ force: reloadDB })
  .then(() => {
    console.log("DB 연결 성공");
    if (reloadDB) {
      resetDefaultDB();
    }
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use("/", pageRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  console.log("500번 에러 세부사항: " + err);
  next(err);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});

const resetDefaultDB = async () => {
  const Location = require("./models/location");
  const Machine = require("./models/machine");
  const Question = require("./models/question");

  const lzoneLoc = await Location.create({
    name: "L존",
    terminal: 1,
    airlinesName: "제주항공",
  });

  let newMachine = await Machine.create({ name: "L1", type: "폐쇄형", LocationId: 1});
  // newMachine.addLocation(1);
  newMachine = await Machine.create({ name: "L2", type: "폐쇄형" , LocationId: 1});
  // newMachine.addLocation(lzoneLoc);
  newMachine = await Machine.create({ name: "L3", type: "폐쇄형", LocationId: 1 });
  // newMachine.addLocation(lzoneLoc);
  newMachine = await Machine.create({ name: "L4", type: "폐쇄형", LocationId: 1 });
  // newMachine.addLocation(lzoneLoc);
  newMachine = await Machine.create({ name: "L5", type: "폐쇄형", LocationId: 1 });
  // newMachine.addLocation(lzoneLoc);
  newMachine = await Machine.create({ name: "L6", type: "폐쇄형", LocationId: 1 });
  // newMachine.addLocation(lzoneLoc);
  newMachine = await Machine.create({ name: "L7", type: "폐쇄형", LocationId: 1 });
  // newMachine.addLocation(lzoneLoc);

  Location.create({ name: "C존", terminal: 1, airlinesName: "아시아나항공" });
  Location.create({ name: "D존", terminal: 2, airlinesName: "대한항공" });

  Question.create({
    name: "기타 문제",
    content: "아래 항목에 없는 문제를 직접 입력하세요.",
    bigName: "기타문제",
  });
  //====
  Question.create({
    name: "수하물 걸림",
    content: "수하물이 기기 안에 걸려서 Weight Not Zero오류 생김.",
    bigName: "수하물 관련",
  });
  Question.create({
    name: "기기 내부 동작 감지",
    content: "수하물이 기기 안에 움직여 내부 동작 발생.",
    bigName: "수하물 관련",
  });
  //====
  Question.create({
    name: "태그잼",
    content: "tag zam오류 발생.",
    bigName: "태그 출력 관련",
  });
  Question.create({
    name: "용지 출력시 걸림",
    content: "용지가 출력했지만 중간에 걸려서 오류 발생.",
    bigName: "태그 출력 관련",
  });
  Question.create({
    name: "용지 미출력",
    content: "용지 출력 화면이지만 용지가 출력되지 않음.",
    bigName: "태그 출력 관련",
  });
  Question.create({
    name: "용지 출력 오류",
    content: "용지가 출력되지만 이상하게 출력됨(위치 다름, 글자 안보임 등).",
    bigName: "태그 출력 관련",
  });
  //====
  Question.create({
    name: "문 안 열림",
    content: "문이 열려야 하지만 열리지 않는 현상",
    bigName: "자동문 관련",
  });
  Question.create({
    name: "문 안 닫힘",
    content: "문이 닫혀야 하지만 닫히지 않는 현상",
    bigName: "자동문 관련",
  });
  //====
  Question.create({
    name: "화면 정지/화이트스크린",
    content: "화면지 정지됐거나 화이트스크린으로 반응 없음",
    bigName: "시스템 관련",
  });
};
