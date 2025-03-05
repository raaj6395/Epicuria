const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { customerService} = require('../services');


const getMenu = catchAsync(async (req, res) => {
  const menuData = await customerService.getMenuData(req.body);
  res.send(menuData);
});

module.exports = {
  getMenu,
}
