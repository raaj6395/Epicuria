const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Restaurant, Order } = require('../models');

// Fetch all orders for a given restaurant
const getAllOrders = async ({ reqBody }) => {
  const { restaurantId } = reqBody;

  if (!restaurantId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Restaurant ID is required');
  }

  const existingRestaurant = await Restaurant.findById(restaurantId);
  if (!existingRestaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
  }

  const orders = await Order.find({ restaurantId }).lean();

  if (!orders || orders.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No orders found');
  }

  return orders;
};

// Fetch a single order by restaurant and order ID
const getOrderById = async ({ reqBody }) => {
  const { restaurantId, orderId } = reqBody;

  if (!restaurantId || !orderId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Restaurant ID and Order ID are required');
  }

  const existingRestaurant = await Restaurant.findById(restaurantId);
  if (!existingRestaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
  }

  const order = await Order.findOne({ _id: orderId, restaurantId }).lean();

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }

  return order;
};

// Update order status
const updateOrderStatus = async ({ reqBody }) => {
  const { restaurantId, orderId, status } = reqBody;

  if (!restaurantId || !orderId || typeof status !== 'boolean') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Restaurant ID, Order ID, and status are required');
  }

  const existingRestaurant = await Restaurant.findById(restaurantId);
  if (!existingRestaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
  }

  const updatedOrder = await Order.findOneAndUpdate(
    { _id: orderId, restaurantId },
    { status },
    { new: true }
  );

  if (!updatedOrder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found or update failed');
  }

  return updatedOrder;
};

// Delete an order
const deleteOrder = async ({ reqBody }) => {
  const { restaurantId, orderId } = reqBody;

  if (!restaurantId || !orderId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Restaurant ID and Order ID are required');
  }

  const existingRestaurant = await Restaurant.findById(restaurantId);
  if (!existingRestaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
  }

  const deletedOrder = await Order.findOneAndDelete({ _id: orderId, restaurantId });

  if (!deletedOrder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found or already deleted');
  }

  return { message: 'Order deleted successfully' };
};

module.exports = {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
