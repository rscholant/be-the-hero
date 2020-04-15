import { Op } from 'sequelize';

const Incident = require('../models/Incident');

module.exports = {
  async index(request, response) {
    const incidents = await Incident.findAll({
      where: {
        [Op.and]: [{ ong_id: request.userId }],
      },
      order: [['createdAt', 'DESC']],
    });
    return response.json(incidents);
  },
};
