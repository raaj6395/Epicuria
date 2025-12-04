const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { orderService } = require('../services');

const fetchAllOrder = catchAsync(async (req, res) => {
  const allOrders = await orderService.getAllOrders({ reqBody: req.body });
  res.send(allOrders);
});

const fetchOrderId = catchAsync(async (req, res) => {
  const orderData = await orderService.getOrderById({ reqBody: req.body });
  res.send(orderData);
});

const updateOrder = catchAsync(async (req, res) => {
  const updatedOrder = await orderService.updateOrderStatus({ reqBody: req.body });
  res.send(updatedOrder);
});

const deleteOrder = catchAsync(async (req, res) => {
  const deletedOrder = await orderService.deleteOrder({ reqBody: req.body });
  res.send(deletedOrder);
});

module.exports = {
  fetchAllOrder,
  fetchOrderId,
  updateOrder,
  deleteOrder,
};
