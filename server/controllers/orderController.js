import asyncHandler from "./../middlewares/asyncHandler.js";

export const createOrder = asyncHandler(async (req, res) => {
  return res.status(201).json({
    message: "Order created sucessfully",
  });
});
export const getAllOrders = asyncHandler(async (req, res) => {
  return res.status(201).json({
    message: "All Orders retrieved sucessfully",
  });
});
export const getSingleOrder = asyncHandler(async (req, res) => {
  return res.status(201).json({
    message: "Order retrieved sucessfully",
  });
});
export const getUserOrder = asyncHandler(async (req, res) => {
  return res.status(201).json({
    message: "Current user orders retrieved sucessfully",
  });
});
