import Sequelize, { Model } from 'sequelize';

class Incidents extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        value: Sequelize.DECIMAL,
        ong_id: Sequelize.INTEGER,
        deleted_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Ong, { foreignKey: 'ong_id', as: 'ong' });
  }
}

export default Incidents;
