const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { restaurantService} = require('../services');
const { resource } = require('../app');


const getMenu = catchAsync(async (req, res) => {
  const menuData = await restaurantService.getMenuData({reqBody : req.body});
  res.send(menuData);
});

const createRestaurant = catchAsync(async(req,res)=>{
  //we have write logic to extract req.user after decoding token in middleware
  const createRestaurantProfile = await restaurantService.createRestaurantProfile({reqBody :req.body});
  res.send(createRestaurantProfile);
})

const createMenu = catchAsync(async(req,res)=>{
  const createMenuData = await restaurantService.createMenuData({reqBody : req.body});
  res.send(createMenuData);
})

const updateItem = catchAsync(async(req,res) => {
  const updateItemData = await restaurantService.updateItemData({reqBody : req.body});
  res.send(updateItemData);
})
const deleteItem = catchAsync(async(req,res)=>{
  const deleteItemData = await restaurantService.deleteItemData({reqBody : req.body});
  res.send(deleteItemData);
})


module.exports = {
  getMenu,
  createRestaurant,
  createMenu,
  updateItem,
  deleteItem,
}
