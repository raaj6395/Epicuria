const Joi = require('joi');
const { Currency } = require('lucide-react');

const fetchMenu = {
  body: Joi.object().keys({
    restaurantId : Joi.string().required()
  }),
};

const createRestaurant = {
  body: Joi.object().keys({
    restaurantName: Joi.string().trim().required(),
    userId: Joi.string().hex().length(24).required(), // Validates MongoDB ObjectId
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

const createMenu = {
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
const updateItem ={
  body : Joi.object().keys({
    items: Joi.array().items(
      Joi.object().keys({
        itemId: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
        itemName: Joi.string().required(),
        price: Joi.number().positive().required(), // Assuming price is required and positive
        available: Joi.boolean().optional(), // Optional availability flag
      })
    ).required(),
  })
}
const createSpecialMenu = {
  body : Joi.object().keys({
    items: Joi.array().items(
      Joi.object().keys({
        itemId: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
        itemName: Joi.string().required(),
        price: Joi.number().positive().required(), // Assuming price is required and positive
        available: Joi.boolean().optional(), // Optional availability flag
      })
    ).required(),
  })

}
const deleteSpecialMenu ={
  body : Joi.object().keys({
    itemId: Joi.alternatives().try(Joi.string(), Joi.number()).required()
  })
}

module.exports = {
  fetchMenu,
  createRestaurant,
  createMenu,
  updateItem,
  createSpecialMenu,
  deleteSpecialMenu
};
