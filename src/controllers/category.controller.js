const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { customerService} = require('../services');


const getCategoryData = catchAsync(async (req, res) => {
  const categoryData = "";
  res.send(categoryData);
});

const createCategory = catchAsync(async(req , res) => {
  const newCategory = "" ;
  res.send(newCategory);
});

const updateCategory = catchAsync(async(req,res) => {
  const updatedCategory = "";
  res.send(updatedCategory);
})

const deleteCategory = catchAsync(async(req,res) =>{
  const deletedCategory = "" ;
  res.send(deletedCategory);
})

module.exports = {
  getCategoryData,
  createCategory,
  updateCategory,
  deleteCategory
}
