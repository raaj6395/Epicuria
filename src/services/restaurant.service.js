const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Restaurant,User } = require('../models');

const getMenuData = async (req, res) => {

  //demo data logic need to be implemented
  const menu = [
    {
      id: 1,
      name: 'Pizza',
      price: 10
    },
    {
      id: 2,
      name: 'Pasta',
      price: 12
    },
    {
      id: 3,
      name: 'Salad',
      price: 8
    }
  ];
  return menu
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

const createMenuData = async(req,res) => {

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


