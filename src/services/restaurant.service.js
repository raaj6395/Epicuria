const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Restaurant,User ,Menu} = require('../models');

const getMenuData = async ({ reqBody }) => {
  if (!reqBody?.restaurantId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Provide Restaurant ID');
  }

  const { restaurantId } = reqBody;

  const existingRestaurant = await Restaurant.findById(restaurantId);
  if (!existingRestaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant Not Found');
  }

  const menuData = await Menu.find({ restaurantId }).lean();
  if (menuData.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No menu found for this restaurant');
  }

  return menuData;
};


const createRestaurantProfile = async({reqBody}) =>{

  if(!reqBody){
    throw new ApiError(httpStatus.BAD_REQUEST,'Data required')
  }

  const { userId } = reqBody;

  // Check if userId exists
  const [existingUser, existingRestaurant] = await Promise.all([
      User.findById(userId),
      Restaurant.findOne({ userId })
  ]);

  if (!existingUser) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found');
  }

  if (existingRestaurant) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Restaurant already exists');
  }

  // Create restaurant profile
  const createRestaurant = new Restaurant(reqBody);
  return await createRestaurant.save();

}

const createMenuData = async({reqBody}) => {
  if (!reqBody) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Data required');
  }

  const { restaurantId, item } = reqBody;

  // Check if the restaurant exists
  const existingRestaurant = await Restaurant.findById(restaurantId);
  if (!existingRestaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
  }

  const menuData = [];

  // Loop through categories and items to structure data
  for (const category of item) {
    const { categoryId,data } = category;

    for (const menuItem of data) {
      const newMenuItem = new Menu({
        restaurantId: restaurantId,
        name: menuItem.itemName,
        description: menuItem.description || '',
        categoryId: categoryId,
        price: menuItem.price,
        currency: menuItem.currency,
        imageUrl: menuItem.imageUrl || '',
        availability: menuItem.availability ?? true, // Default true if undefined
        isVegetarian: menuItem.isVegetarian,
      });

      menuData.push(newMenuItem);
    }
  }

  // Insert all menu items into the database
  await Menu.insertMany(menuData);

  return { message: 'Menu items created successfully', menuData };

}

const updateItemData = async(req,res) => {
}

const deleteItemData = async(req,res) =>{

}

const createSpecialMenuData = async(req,res) => {

}

const deleteSpecialMenuData = async(req,res)=>{

}

  module.exports = {
    getMenuData,
    createRestaurantProfile,
    createMenuData,
    updateItemData,
    deleteItemData,
    createSpecialMenuData,
    deleteSpecialMenuData,
    };


