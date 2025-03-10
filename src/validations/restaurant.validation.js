const Joi = require('joi');

const fetchMenu = {
  params: Joi.object().keys({
    restaurantId : Joi.string().required()
  }),
};
const createMenu = {
  body: Joi.object().keys({
    categories: Joi.array().items(
      Joi.object().keys({
        categoryId: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
        categoryName: Joi.string().required(),
        items: Joi.array().items(
          Joi.object().keys({
            itemId: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
            itemName: Joi.string().required(),
            price: Joi.number().positive().required(), // Assuming price is required and positive
            available: Joi.boolean().optional(), // Optional availability flag
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
  createMenu,
  updateItem,
  createSpecialMenu,
  deleteSpecialMenu
};
