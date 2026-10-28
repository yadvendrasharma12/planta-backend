
import mongoose from "mongoose";

import { asyncHandler } from "../utils/asyncHandler.js";
import { errorResponse } from "../utils/errorResponse.js";
import { successResponse } from "../utils/successResponse.js";
import { cartFindByIdRepo, deleteAllCartRepo, findCartByUserIdRepo, findCartRepo, removeCartRepo } from "../repositories/cartRepositories.js";




export const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  if (!mongoose.isValidObjectId(productId)) {
    return errorResponse(res, 400, "Invalid Product ID");
  }


  const product = await cartFindByIdRepo(productId);

  if (!product) {
    return errorResponse(res, 404, "Product not found");
  }

  let cart = await findCartByUserIdRepo(userId);

  if (!cart) {
    cart = await addCartRepo({
      userId,
      items: [{ product: productId, quantity: 1 }],
    });
  } else {

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        product: productId,
        quantity: 1,
      });
    }

    await cart.save();
  }


  return successResponse(
    res,
    200,
    "Product added to cart successfully",
    null,
    null,
  );
});




export const getCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!mongoose.isValidObjectId(userId)) {
    return errorResponse(res, 400, "Invalid User ID");
  }

  const cart = await findCartRepo(userId);

  if (!cart) {
    return errorResponse(res, 404, "Your cart is currently empty");
  }

  const items = cart.items
    .filter((item) => item.product)
    .map((item) => ({
      product: {
        productId: item.product._id,
        productTitle: item.product.productTitle,
        productDescription: item.product.productDescription,
        productImage: item.product.productImage,
        price: item.product.price,
        mass: item.product.mass,
        origin: item.product.origin,
        stock: item.product.stock,
        category: item.product.category,
        quantity: item.quantity,
        subtotal: item.product.price * item.quantity,
      },
    }));


  return successResponse(
    res,
    200,
    "Cart fetched successfully",
    null,
    null,
    items
    // {
    //   cartId: cart._id,
    //   items
    // }
  );
});



export const removeCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  if (!mongoose.isValidObjectId(productId)) {
    return errorResponse(res, 400, "Invalid Product ID");
  }

  const cart = await removeCartRepo(userId, productId);

  if (!cart) {
    return errorResponse(res, 404, "Cart or product not found");
  }

  return successResponse(
    res,
    200,
    "Product removed from cart successfully",
    null,
    null,
  );
});


export const deleteAllCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const cart = deleteAllCartRepo(userId);
  if (!cart) {
    return errorResponse(res, 404, "Cart not found")
  }
  return successResponse(
    res, 200, "Delete all Cart successfully"
  )
})