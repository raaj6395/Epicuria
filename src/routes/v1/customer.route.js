const express = require('express');
const customerController = require('../../controllers/customer.controller');
const menuValidation = require('../../validations/menu.validation')
const orderValidation = require('../../validations/order.validation');
const validate = require('../../middlewares/validate');


const router = express.Router();


// missing validation
router
.route('/menu')
.get(validate(menuValidation.validateFetchMenu),customerController.getMenu);

// router
// .route('/order')
// .post(orderValidation.placeOrder);


module.exports = router;
