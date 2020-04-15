const bcrypt = require('bcryptjs');

const { Model, DataTypes } = require('sequelize');

class Ong extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        whatsapp: DataTypes.STRING,
        city: DataTypes.STRING,
        uf: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'Ong',
        tableName: 'ongs',
        timestamps: true,
      }
    );
    this.addHook('beforeSave', async (ong) => {
      if (ong.password) {
        ong.password = await bcrypt.hash(ong.password, 8);
      }
    });

    return this;
  }
  checkPassword(pass) {
    return bcrypt.compare(pass, this.password);
  }
}

module.exports = Ong;
