const express = require('express');
const customerController = require('../../controllers/customer.controller');
const orderValidation = require('../../validations/order.validation');


const router = express.Router();


// missing validation
router
.route('/menu')
.get(customerController.getMenu);

// router
// .route('/order')
// .post(orderValidation.placeOrder);


module.exports = router;
