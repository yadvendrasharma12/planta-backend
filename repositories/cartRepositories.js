
import Cart from "../model/cart.js";
import Product from "../model/planta.js";

export const cartFindByIdRepo = (productId) => {
  return Product.findById(productId);
};

export const findCartByUserIdRepo = (userId) => {
  return Cart.findOne({ userId });
};

export const addCartRepo = (data) => {
  return Cart.create(data);
};

export const findCartRepo = (userId) => {
  return Cart.findOne({ userId }).populate("items.product");
};


export const removeCartRepo = async (userId, productId) => {
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    return null;
  }

  const itemExists = cart.items.some(
    (item) => item.product.toString() === productId
  );

  if (!itemExists) {
    return null;
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  await cart.save();

  return cart;
};


export const deleteAllCartRepo = async (userId) => {
  return await Cart.findOneAndDelete({ userId })
}
