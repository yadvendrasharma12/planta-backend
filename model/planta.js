
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productTitle: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },

    productDescription: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0.01, "Price must be greater than 0"],
    },

    productImage: {
      type: String,
      required: [true, "Product image is required"],
    },
    mass: {
      type: String,
      trim: true,
      required: [true, "mass image is required"],
    },
    origin: {
      type: String,
      trim: true,
      required: [true, "origin image is required"],
    },

    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
      validate: {
        validator: Number.isInteger,
        message: "Stock must be a whole number",
      },
    },


    category: {
      type: String,
      required: [true, "Product category is required"],
      trim: true,
      enum: [
        "Plants", "Equipments",
        "Plates", "Cups",
      ],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
