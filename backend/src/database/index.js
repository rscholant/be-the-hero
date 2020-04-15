import Sequelize from 'sequelize';
import Ong from '../app/models/Ong';
import Incident from '../app/models/Incident';

import databaseConfig from '../config/database';

const models = [Ong, Incident];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(
      process.env.NODE_ENV === 'test'
        ? databaseConfig.test
        : databaseConfig.development
    );

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
