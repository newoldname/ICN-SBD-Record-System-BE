const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];

const Event = require("./event");
const Location = require("./location");
const Machine = require("./machine");
const Question = require("./question");
const User = require("./user");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Event = Event;
db.Location = Location;
db.Machine = Machine;
db.Question = Question;
db.User = User;

Event.init(sequelize);
Location.init(sequelize);
Machine.init(sequelize);
Question.init(sequelize);
User.init(sequelize);

Event.associate(db);
Location.associate(db);
Machine.associate(db);
Question.associate(db);
User.associate(db);

module.exports = db;
