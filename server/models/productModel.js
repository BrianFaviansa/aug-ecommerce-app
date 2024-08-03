import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    unique: [true, "Product name is already exist, please use different one"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
  },
  image: {
    type: String,
    default: null,
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
    enum: ["shoes", "shirts", "t-shirts", "pants"],
  },
  stock: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
