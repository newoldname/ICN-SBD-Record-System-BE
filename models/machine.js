const Sequelize = require("sequelize");

class Machine extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        type: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Machine',
        tableName: 'machines',
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate(db) {
    db.Machine.belongsTo(db.Location);
    db.Machine.hasMany(db.Event);
  }
}

module.exports = Machine;
