const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');


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

  module.exports = {
    getMenuData,
  };
