module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'ongs',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        email: {
          allowNull: false,
          type: Sequelize.STRING,
          unique: true,
        },
        whatsapp: {
          allowNull: false,
          type: Sequelize.STRING,
          unique: true,
        },
        city: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        uf: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      { timestamps: true }
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('ongs');
  },
};
