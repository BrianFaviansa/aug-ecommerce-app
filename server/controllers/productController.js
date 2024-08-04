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
  const { page = 1, limit = 5, name, ...filters } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  let query = {};
  if (name) {
    query.name = { $regex: name, $options: "i" };
  } else {
    query = filters;
  }

  const productsQuery = Product.find(query).skip(skip).limit(Number(limit));

  const [products, totalProducts] = await Promise.all([
    productsQuery.exec(),
    Product.countDocuments(query),
  ]);

  if (skip >= totalProducts) {
    return res.status(404).json({
      message: "This page doesn't exist",
    });
  }

  return res.status(200).json({
    message: "Products retrieved successfully",
    products,
    pagination: {
      currentPage: Number(page),
      totalPages: Math.ceil(totalProducts / Number(limit)),
      totalProducts,
    },
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
