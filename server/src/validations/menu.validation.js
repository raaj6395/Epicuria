const Joi = require('joi');
const { Currency } = require('lucide-react');

const validateFetchMenu = {
  body: Joi.object().keys({
    restaurantId : Joi.string().required()
  }),
};

const validateCreateMenu = {
  body: Joi.object().keys({
    restaurantId : Joi.string().hex().length(24).required(),
    item: Joi.array().items(
      Joi.object().keys({
        categoryId: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
        categoryName: Joi.string().required(),
        data: Joi.array().items(
          Joi.object().keys({
            itemName: Joi.string().required(),
            description :Joi.string().optional(),
            currency  :Joi.string().required(),
            discount : Joi.number().optional(),
            imageUrl :Joi.string().uri().allow(''),
            price: Joi.number().positive().required(), // Assuming price is required and positive
            availability: Joi.boolean().optional(), // Optional availability flag
            isVegetarian: Joi.boolean().required(),
          })
        ).required(),
      })
    ).required(),
  }),
};

const validateUpdateMenuItem = {
  body: Joi.object().keys({
    restaurantId: Joi.string().hex().length(24).required(),
    categoryId: Joi.alternatives().try(Joi.string(), Joi.number()).optional(),
    itemId: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    itemName: Joi.string().optional(),
    description: Joi.string().optional(),
    discount: Joi.number().optional(),
    currency: Joi.string().optional(),
    imageUrl: Joi.string().uri().allow('').optional(),
    price: Joi.number().positive().optional(), // Optional, but must be positive if provided
    availability: Joi.boolean().optional(),
    isVegetarian: Joi.boolean().optional(),
  }),
};



module.exports = {
  validateFetchMenu,
  validateCreateMenu,
  validateUpdateMenuItem,
};
