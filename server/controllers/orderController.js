import asyncHandler from "./../middlewares/asyncHandler.js";
import Product from "./../models/productModel.js";
import Order from "../models/orderModel.js";

export const createOrder = asyncHandler(async (req, res) => {
  const { email, firstName, lastName, phone, cartItem } = req.body;
  if (!cartItem || cartItem.length < 1) {
    res.status(400);
    throw new Error("Your cart is empty");
  }

  let orderItem = [];
  let total = 0;

  for (const cart of cartItem) {
    const productData = await Product.findOne({ _id: cart.product });
    if (!productData) {
      res.status(404);
      throw new Error("Product not found");
    }
    const { name, price, _id } = productData;
    const singleProudct = {
      quantity: cart.quantity,
      name,
      price,
      product: _id,
    };
    orderItem = [...orderItem, singleProudct];
    total += cart.quantity * price;
  }

  const order = await Order.create({
    itemsDetail: orderItem,
    total,
    firstName,
    lastName,
    email,
    phone,
    user: req.user.id,
  });

  return res.status(201).json({
    message: "Order created sucessfully",
    order,
    total,
  });
});
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();

  return res.status(201).json({
    message: "All Orders retrieved sucessfully",
    orders,
  });
});
export const getSingleOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);

  return res.status(201).json({
    message: "Order retrieved sucessfully",
    order,
  });
});
export const getUserOrder = asyncHandler(async (req, res) => {
  const order = await Order.find({ user: req.user.id });

  return res.status(201).json({
    message: "Current user orders retrieved sucessfully",
    order,
  });
});
