
import Cart from "../model/cart.js";
import Order from "../model/order.js";

export const createOrderRepo = async (data) => {
  return await Order.create(data);
};

export const findOrderCartRepo = async (userId) => {
  return await Cart.findOne({ userId }).populate("items.product");
};


export const findOrderRepo = async (userId) => {
  return await Order.find({ userId }).select("-userId -__v")
    .sort({ createdAt: -1 })
    .lean();
};