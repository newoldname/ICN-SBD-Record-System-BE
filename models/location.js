const Sequelize = require("sequelize");

class Location extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        terminal: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        airlinesName: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Location",
        tableName: "locations",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Location.belongsToMany(db.User, {
      through: "UserLocation",
    });

    db.Location.hasMany(db.Machine);
  }
}

module.exports = Location;
