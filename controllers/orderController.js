
import { asyncHandler } from "../utils/asyncHandler.js";
import { errorResponse } from "../utils/errorResponse.js";
import { successResponse } from "../utils/successResponse.js";
import {
  findOrderCartRepo,
  createOrderRepo,
  findOrderRepo,
} from "../repositories/orderRepositories.js";

export const createOrderController = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const {
    name,
    email,
    mobile,
    address,
    city,
    state,
    pinCode,
  } = req.body;

  const cart = await findOrderCartRepo(userId);

  if (!cart) {
    return errorResponse(res, 404, "Cart not found");
  }

  const items = cart.items.map((item) => ({
    product: item.product._id,
    productTitle: item.product.productTitle,
    price: item.product.price,
    productImage: product.productImage,
    quantity: item.quantity,
  }));

  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const order = await createOrderRepo({
    userId,
    items,
    name,
    email,
    mobile,
    address,
    city,
    state,
    pinCode,
    totalAmount,
  });

  return successResponse(
    res,
    201,
    "Order created successfully",
    null,
    null,
  );
});


export const findOrderController = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const orders = await findOrderRepo(userId);

  if (!orders || orders.length === 0) {
    return errorResponse(res, 404, "No orders found");
  }

  return successResponse(
    res,
    200,
    "Orders fetched successfully",
    null,
    null,
    orders
  );
});
