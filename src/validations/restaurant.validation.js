const Joi = require('joi');
const { Currency } = require('lucide-react');

const createRestaurant = {
  body: Joi.object().keys({
    restaurantName: Joi.string().trim().required(),
    userId: Joi.string().hex().length(24).required(),
    profileImageUrl: Joi.string().uri().allow(''), // Optional but must be a valid URL if provided
    coverImageUrl: Joi.string().uri().allow(''),
    backgroundImageUrl: Joi.string().uri().allow(''),
    address: Joi.string().trim().required(),
    city: Joi.string().trim().required(),
    state: Joi.string().trim().required(),
    zipCode: Joi.string().trim().required(),
    openingTime: Joi.string().trim().required(), // You can add regex validation for time format
    closingTime: Joi.string().trim().required(),
    descriptions: Joi.string().trim().allow(''), // Optional
    vegetarian: Joi.boolean().default(false),
  }),
};

module.exports = {
  createRestaurant,
};
