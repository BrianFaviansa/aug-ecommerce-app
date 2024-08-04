import mongoose from "mongoose";

const { Schema } = mongoose;

const singleProduct = Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  product: { type: Schema.ObjectId, ref: "Product", required: true },
});

const orderSchema = new Schema({
  total: {
    type: Number,
    required: [true, "Total price is required"],
  },
  itemsDetail: [singleProduct],
  user: { type: Schema.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["pending", "failed", "success"],
    default: "pending",
  },
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone Number is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
