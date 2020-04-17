const { Model, DataTypes } = require('sequelize');

class Incident extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        value: DataTypes.DECIMAL,
        ong_id: DataTypes.INTEGER,
        deleted_at: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: 'Incident',
        tableName: 'incidents',
        timestamps: true,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Ong, { foreignKey: 'ong_id', as: 'ong' });
  }
}

module.exports = Incident;
