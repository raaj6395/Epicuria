const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Restaurant, Menu, Category } = require('../models');

const getMenuData = async ({ reqBody }) => {
  if (!reqBody?.restaurantId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Provide Restaurant ID');
  }
  const { restaurantId } = reqBody;

  const existingRestaurant = await Restaurant.findById(restaurantId);
  if (!existingRestaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant Not Found');
  }
// first db call
  const categories = await Category.find({ restaurantId });
  if (categories.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No categories found for this restaurant');
  }
// 2nd db call
  const menus = await Menu.find({ restaurantId });
  if (menus.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No menu items found for this restaurant');
  }


  const grouped = categories.reduce((acc, category) => {
    const items = menus.filter(
      menu => menu.categoryId.toString() === category._id.toString()
    );
    acc[category.name] = items;
    return acc;
  }, {});

  return grouped;
};

module.exports = {
  getMenuData,
};
