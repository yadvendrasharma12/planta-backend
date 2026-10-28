
import Product from "../model/planta.js";

export const createPlantaRepo = (data) => {
  return Product.create(data);
};

export const getPlantaRepo = (filter = {}, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  return Product.find(filter)
    .skip(skip)
    .limit(limit);
};

export const countPlantaRepo = (filter = {}) => {
  return Product.countDocuments(filter);
};

export const getPlantaByIdRepo = (id) => {
  return Product.findById(id)
};

export const deletePlantaRepo = (id) => {
  return Product.findByIdAndDelete(id);
};

export const updatePlantaRepo = (id, updateData) => {
  return Product.findByIdAndUpdate(
    id,
    updateData,
    { new: true, runValidators: true }
  );
};

