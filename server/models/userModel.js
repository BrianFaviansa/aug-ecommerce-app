import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: [true, "Name is already exist, please use different one"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email is already exist, please use different one"],
    validate: {
      validator: validator.isEmail,
      message: "Email format is invalid",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [5, "Password must be at least 5 characters length"],
  },
  role: {
    type: String,
    enum: ["user", "owner"],
    default: "user",
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
