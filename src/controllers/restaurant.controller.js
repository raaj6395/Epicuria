const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { restaurantService} = require('../services');


const getMenu = catchAsync(async (req, res) => {
  const menuData = await restaurantService.getMenuData(req.body);
  res.send(menuData);
});

const createMenu = catchAsync(async(req,res)=>{
  const createMenuData = await restaurantService.createMenuData(req.body);
  res.send(createMenuData);
})

const updateItem = catchAsync(async(req,res) => {
  const updateItemData = await restaurantService.updateItemData(req.body);
  res.send(updateItemData);
})

const createSpecialMenu = catchAsync(async(req,res) => {
  const createSpecialMenuData = await restaurantService.createSpecialMenuData(req.body);
  res.send(createSpecialMenuData);
})

const deleteSpecialMenu = catchAsync(async(req,res) =>{
  const deleteSpecialMenuData = await restaurantService.deleteSpecialMenuData(req.body);
  res.send(deleteSpecialMenuData);
})

module.exports = {
  getMenu,
  createMenu,
  updateItem,
  createSpecialMenu,
  deleteSpecialMenu,
}
