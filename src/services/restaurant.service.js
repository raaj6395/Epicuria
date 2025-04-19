const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Restaurant,User ,Menu,SpecialMenu} = require('../models');

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
      throw new ApiError(httpStatus.BAD_REQUEST, 'Restaurant already exists with this userId');
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
        itemName: menuItem.itemName,
        description: menuItem.description || '',
        categoryId: categoryId,
        price: menuItem.price,
        discount : menuItem.discount || 0,
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

const updateItemData = async ({ reqBody }) => {
  if (!reqBody?.restaurantId || !reqBody?.itemId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Restaurant ID and Item ID are required');
  }

  const { restaurantId, itemId, ...updateFields } = reqBody;

  const existingRestaurant = await Restaurant.findById(restaurantId).lean();
  if (!existingRestaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant Not Found');
  }

  const existingItem = await Menu.findById(itemId).lean();
  if (!existingItem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item Not Found');
  }

  const updatedItem = await Menu.findByIdAndUpdate(itemId, updateFields, {
    new: true,
    runValidators: true
  });

  if (!updatedItem) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to Update Data');
  }

  return updatedItem;
};


const deleteItemData = async ({ reqBody }) => {
  const { restaurantId, itemId } = reqBody || {};

  if (!restaurantId || !itemId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Restaurant ID and Item ID are required');
  }

  const existingRestaurant = await Restaurant.findById(restaurantId).lean();
  if (!existingRestaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant Not Found');
  }

  const deletedItem = await Menu.findByIdAndDelete(itemId);

  if (!deletedItem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item Not Found or Already Deleted');
  }

  return {message : "Item deleted Successfully"};
};



  module.exports = {
    getMenuData,
    createRestaurantProfile,
    createMenuData,
    updateItemData,
    deleteItemData,
    };


