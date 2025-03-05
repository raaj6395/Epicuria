const express = require('express');
const customerController = require('../../controllers/customer.controller');


const router = express.Router();

router.get('/menu',customerController.getMenu);


module.exports = router;
