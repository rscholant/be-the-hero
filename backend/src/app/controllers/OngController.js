import { Op } from 'sequelize';

const Ong = require('../models/Ong');

module.exports = {
  async index(request, response) {
    const ongs = await Ong.findAll();
    return response.json(ongs);
  },

  async create(request, response) {
    const { name, email, whatsapp, city, uf, password } = request.body;

    try {
      const ongExistent = await Ong.findOne({
        where: { [Op.or]: [{ email }, { whatsapp }] },
      });

      if (ongExistent) {
        return response.status(400).json({ error: 'Ong already exists 😥' });
      }
      await Ong.create({
        name,
        email,
        whatsapp,
        city,
        uf,
        password,
      });
      return response.status(201).send('Ong Successfully created 🙌!');
    } catch (error) {
      return response.status(400).send(error);
    }
  },
};
