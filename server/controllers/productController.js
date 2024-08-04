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
  const products = await Product.find();
  return res.status(200).json({
    message: "All Products retrieved succesfully",
    products,
  });
});
export const getSingleProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("No products found");
  }
  return res.status(200).json({
    message: "Product retrieved successfully",
    product,
  });
});
export const updateProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const updateProduct = await Product.findByIdAndUpdate(productId, req.body, {
    runValidators: false,
    new: true,
  });
  return res.status(201).json({
    message: "Product updated successfully",
    product: updateProduct,
  });
});
export const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  await Product.findByIdAndDelete(productId);
  return res.status(200).json({
    message: "Product deleted successfully",
  });
});
export const fileUpload = asyncHandler(async (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400);
    throw new Error("Please upload an image");
  }
  const imageFileName = file.filename;
  const pathImageFile = `/uploads/${imageFileName}`;

  res
    .status(200)
    .json({ message: "Image uploaded successfully", image: pathImageFile });
});
