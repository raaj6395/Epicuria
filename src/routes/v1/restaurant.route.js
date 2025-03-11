const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const restaurantValidation = require('../../validations/restaurant.validation');
const restaurantController = require('../../controllers/restaurant.controller');

const router = express.Router();

router
.route('/create-profile')
.post(validate(restaurantValidation.createRestaurant),restaurantController.createRestaurant);

router
  .route('/menu-fetch')
  .get(validate(restaurantValidation.fetchMenu), restaurantController.getMenu);

router
  .route('/menu-create')
  .post(validate(restaurantValidation.createMenu),restaurantController.createMenu);
  
router
  .route('/menu-update-item')
  .put(validate(restaurantValidation.updateItem),restaurantController.updateItem)
  .delete(validate(restaurantValidation.updateItem),restaurantController.deleteItem);

router
  .route('/menu-special')
  .post(validate(restaurantValidation.createSpecialMenu),restaurantController.createSpecialMenu)
  .delete(validate(restaurantValidation.deleteSpecialMenu),restaurantController.deleteSpecialMenu)



module.exports = router;

