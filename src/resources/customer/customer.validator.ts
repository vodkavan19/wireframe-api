import Joi from 'joi';

const login = Joi.object({
  client_id: [Joi.string().trim(), Joi.any().strip()],
  user: Joi.object({
    id: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
  })
});

const register = Joi.object({
  id: Joi.string().required(),
  password: Joi.string().required(),
});

const detail = Joi.object({
  customerid: Joi.string().trim().required(),
})

export default { login, register, detail };