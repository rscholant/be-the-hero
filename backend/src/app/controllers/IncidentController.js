const Incident = require('../models/Incident');
const Ong = require('../models/Ong');

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const count = await Incident.count();

    response.header('X-Total-Count', count);
    const incidents = await Incident.findAll({
      where: { deleted_at: null },
      order: [['createdAt', 'DESC']],
      limit: 5,
      offset: (page - 1) * 5,
      include: [
        {
          model: Ong,
          as: 'ong',
          attributes: ['id', 'name', 'email', 'whatsapp', 'city', 'uf'],
        },
      ],
    });

    return response.json(incidents);
  },
  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.userId;

    const incident = await Incident.create({
      title,
      description,
      value,
      ong_id,
    });
    return response.json({ incident });
  },
  async delete(request, response) {
    const { id } = request.params;

    const incidentExists = await Incident.findByPk(id);
    if (!incidentExists) {
      return response
        .status(404)
        .json({ error: "You cannot delete an incident that's not yours. 🚫" });
    }
    if (incidentExists.ong_id !== request.userId) {
      return response
        .status(401)
        .json({ error: 'Operation not permitted. 🚫' });
    }
    await incidentExists.delete();
    return response.status(204).send();
  },
};
