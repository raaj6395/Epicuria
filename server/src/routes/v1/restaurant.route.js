const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const restaurantValidation = require('../../validations/restaurant.validation');
const menuValidation = require('../../validations/menu.validation');
const orderValidation = require('../../validations/order.validation');
const analyticsValidation = require('../../validations/analytics.validation');
const categoryValidation = require('../../validations/category.validation');
const restaurantController = require('../../controllers/restaurant.controller');
const menuController = require('../../controllers/menu.controller');
const orderController = require('../../controllers/order.controller');
const analyticsController = require('../../controllers/analytics.controller');

const router = express.Router();

router
.route('/create-restaurant')
.post(validate(restaurantValidation.createRestaurant),restaurantController.createRestaurant);

router
  .route('/menu')
  .get(validate(menuValidation.validateFetchMenu), restaurantController.getMenu)
  .post(validate(menuValidation.validateCreateMenu),restaurantController.createMenu)
  .put(validate(menuValidation.validateUpdateMenuItem),restaurantController.updateItem)
  .delete(validate(menuValidation.validateUpdateMenuItem),restaurantController.deleteItem);

router
  .route('/categoryId')
  .get(validate(categoryValidation.validateCreateCategory))
  .post()
  .put()
  .delete();

router
  .route('/order')
  .get(validate(orderValidation.validateFetchAllOrders),orderController.fetchAllOrder)
  .get(validate(orderValidation.validateOrderId),orderController.fetchOrderId)
  .put(validate(orderValidation.validateOrderId),orderController.updateOrder)
  .delete(validate(orderValidation.validateOrderId),orderController.deleteOrder);

router
  .route('/order/:id/bill')

router
  .route('/analytics')





module.exports = router;

