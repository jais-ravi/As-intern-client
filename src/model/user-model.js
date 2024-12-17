const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AddressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  mobileNumber: {
    type: String,
    required: [true, "Mobile number is required"],
    match: [/^\d{10}$/, "Please provide a valid 10-digit mobile number"],
  },
  addressLine1: {
    type: String,
    required: [true, "Address Line 1 is required"],
    trim: true,
  },
  addressLine2: {
    type: String,
    trim: true,
  },
  landmark: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    required: [true, "City is required"],
    trim: true,
  },
  postalCode: {
    type: String,
    required: [true, "Postal code is required"],
    match: [/^\d{6}$/, "Please provide a valid 6-digit postal code"],
  },
  state: {
    type: String,
    required: [true, "State is required"],
    trim: true,
  },
}, { _id: true }); 

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity must be at least 1"],
    default: 1,
  },
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minLength: 2,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/.+\@.+\..+/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    verifyCode: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifyCodeExpiry: {
      type: Date, 
      default: () => new Date(Date.now() + 10 * 60 * 1000), 
    },
    cart: {
      type: [CartItemSchema],                
      default: [],
    },
    orders: {
      type: Array,
      default: [],
    },
    contact: {
      type: String, 
      match: [/^\d{10}$/, "Please provide a valid contact number"], 
    },
    picture: {
      type: String,
    },
    addresses: {
      type: [AddressSchema], // Array of addresses
      default: [], // Default to an empty array
    },
  },
  { collection: "myusers", timestamps: true } 
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = UserModel;
