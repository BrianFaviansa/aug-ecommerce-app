import asyncHandler from "./../middlewares/asyncHandler.js";
import Product from "./../models/productModel.js";

export const createProduct = asyncHandler(async (req, res) => {
  const newProduct = await Product.create(req.body);
  return res.status(201).json({
    message: "Product created sucessfully",
    data: newProduct,
  });
});
export const getAllProducts = asyncHandler(async (req, res) => {
  res.send("Get all products");
});
export const getSingleProduct = asyncHandler(async (req, res) => {
  res.send("Get detail product");
});
export const updateProduct = asyncHandler(async (req, res) => {
  res.send("Update product");
});
export const deleteProduct = asyncHandler(async (req, res) => {
  res.send("Delete product");
});
export const fileUpload = asyncHandler(async (req, res) => {
  res.send("File Uplaod product");
});
