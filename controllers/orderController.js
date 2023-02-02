import orderModel from "../models/orderModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import productModel from "../models/productModel.js";

// Create new order.
export const newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    taxPrice,
    shippingPrice,
    totalPrice,
    itemsPrice,
  } = req.body;

  const order = await orderModel.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// get single order.
export const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await orderModel
    .findById(req.params.id)
    .populate("user", "name email");

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user orders.
export const myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await orderModel.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// get all orders ==> admin
export const getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await orderModel.find();

  let totalAmount = 0;

  orders.forEach((orders) => {
    totalAmount = orders.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// update order status ==> admin
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await orderModel.findById(req.params.id);

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order"));
  }

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (order) => {
      await updateStock(order.product, order.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status == "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await productModel.findById(id);

  product.Stock = product.Stock - quantity;

  await product.save({ validateBeforeSave: false });
}

// Delete orders ==> admin
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await orderModel.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  order.remove();

  res.status(200).json({
    success: true,
  });
});
