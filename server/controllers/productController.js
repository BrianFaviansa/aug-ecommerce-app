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
  const queryObject = { ...req.query };
  const excludeField = ["page", "limit", "name"];
  excludeField.forEach((element) => {
    delete queryObject[element];
  });

  let query;

  if (req.query.name) {
    query = Product.find({ name: { $regex: req.query.name, $options: "i" } });
  } else {
    query = Product.find(queryObject);
  }

  //* pagination
  const page = req.query.page * 1 || 1;
  const limitData = req.query.limit * 1 || 5;
  const skipData = (page - 1) * limitData;

  query = query.skip(skipData).limit(limitData);
  let countProducts = await Product.countDocuments();
  if (req.query.page) {
    if (skipData >= countProducts) {
      res.status(404);
      throw new Error("This page doesn't exist");
    }
  }

  const products = await query;

  return res.status(200).json({
    message: "Products retrieved succesfully",
    products,
    count: countProducts,
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
