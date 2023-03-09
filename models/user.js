const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        workDay: {
          type: Sequelize.STRING(7),
          allowNull: true,
        },
        workStartHour: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        workEndHour: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        isChecked: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        provider: {
          type: Sequelize.STRING(10),
          allowNull: false,
          defaultValue: "local",
        },
        snsId: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.belongsToMany(db.Location, {
      through: "UserLocation",
    });
    db.User.hasMany(db.Event);
  }
}

module.exports = User;
