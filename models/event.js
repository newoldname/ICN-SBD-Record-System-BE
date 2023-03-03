const Sequelize = require("sequelize");

class Event extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        etcQuestion: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Event",
        tableName: "events",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Event.belongsTo(db.User);
    db.Event.belongsTo(db.Machine);
    db.Event.belongsTo(db.Question);
  }
}

module.exports = Event;
