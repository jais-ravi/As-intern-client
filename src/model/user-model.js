const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
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
      type: Date, // Store as a Date object
      default: () => new Date(Date.now() + 10 * 60 * 1000), // Default 10 minutes from now
    },
    cart: {
      type: Array,
      default: [],
    },
    orders: {
      type: Array,
      default: [],
    },
    contact: {
      type: String, // Store as a string for better validation
      match: [/^\d{10}$/, "Please provide a valid contact number"], // Example validation for 10-digit numbers
    },
    picture: {
      type: String,
    },
  },
  { collection: "myusers", timestamps: true } // Timestamps to track creation and updates
);

// Pre-save hook for password hashing
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = UserModel;
