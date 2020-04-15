module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './src/database/db.sqlite',
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
  },
};
