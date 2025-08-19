const Joi = require('joi');


const validateCreateCategory = {
  body: Joi.object().keys({
    restaurantId : Joi.string().required(),
    categoryName : Joi.string().required()
  }),
};


module.exports = {
  validateCreateCategory
};
