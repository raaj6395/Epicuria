const Joi = require('joi');

const validateFetchAllOrders = {
  body: Joi.object().keys({
    restaurantId : Joi.string().required(),
  }),
}

const validateOrderId ={
  body: Joi.object().keys({
      restaurantId : Joi.string().required(),
      orderId : Joi.string().required(),
      status : Joi.boolean().required()
    }),
}

module.exports = {
  validateFetchAllOrders,
  validateOrderId,
};
