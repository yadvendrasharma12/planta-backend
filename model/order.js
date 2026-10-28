
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        productTitle: {
          type: String,
          required: true,
          trim: true,
        },
        price: {
          type: Number,
          required: true,
          min: [0.01, "Price must be greater than 0"],
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"],
        },
      },
    ],

    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [1, "Name is required"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email",
      ],
    },

    productImage: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
      match: [/^[0-9]{10}$/, "Mobile must be exactly 10 digits"],
    },

    address: {
      type: String,
      required: true,
      trim: true,
      minlength: [5, "Address must be at least 5 characters"],
      maxlength: [100, "Address cannot exceed 100 characters"],
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    pinCode: {
      type: String,
      required: true,
      trim: true,
      match: [/^[0-9]{6}$/, "PIN code must be exactly 6 digits"],
    },

    totalAmount: {
      type: Number,
      required: true,
      min: [0.01, "Total amount must be greater than 0"],
    },

    paymentMethod: {
      type: String,
      enum: ["COD"],
      default: "COD",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    status: {
      type: String,
      enum: [
        "placed",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "placed",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
