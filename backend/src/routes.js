import authMiddleware from './app/middlewares/auth';

const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./app/controllers/OngController');
const IncidentController = require('./app/controllers/IncidentController');
const ProfileController = require('./app/controllers/ProfileController');
const SessionController = require('./app/controllers/SessionController');

const routes = express.Router();

routes.post(
  '/sessions',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().min(6).max(20).required(),
    }),
  }),
  SessionController.store
);
routes.get(
  '/incidents',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
    }),
  }),
  IncidentController.index
);
routes.get('/ongs', OngController.index);
routes.post(
  '/ongs',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required().min(10).max(11),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2),
      password: Joi.string().min(6).max(20).required(),
      confirmPassword: Joi.string().required().valid(Joi.ref('password')),
    }),
  }),
  OngController.create
);

routes.use(authMiddleware);

routes.get(
  '/profile',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  ProfileController.index
);
routes.post(
  '/incidents',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required().email(),
      value: Joi.number().required(),
    }),
  }),
  IncidentController.create
);
routes.delete(
  '/incidents/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  IncidentController.delete
);
module.exports = routes;
