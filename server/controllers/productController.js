import asyncHandler from "./../middlewares/asyncHandler.js";
import Product from "./../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

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

  let query = { ...filters }; // Start with all filters
  if (name) {
    query.name = { $regex: name, $options: "i" };
  }

  const [products, totalProducts] = await Promise.all([
    Product.find(query).skip(skip).limit(Number(limit)),
    Product.countDocuments(query),
  ]);

  const totalPages = Math.ceil(totalProducts / Number(limit));

  return res.status(200).json({
    message: products.length
      ? "Products retrieved successfully"
      : "No products found",
    products,
    pagination: {
      currentPage: Number(page),
      totalPages,
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
  const stream = cloudinary.uploader.upload_stream(
    {
      folder: "uploads",
      allowed_formats: ["jpg", "png"],
    },
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Image upload failed",
          error: err,
        });
      }
      res.json({
        message: "Upload image success",
        url: result.secure_url,
      });
    }
  );
  streamifier.createReadStream(req.file.buffer).pipe(stream);
});
