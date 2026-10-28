
import mongoose from "mongoose";
import { countPlantaRepo, createPlantaRepo, deletePlantaRepo, getPlantaByIdRepo, getPlantaRepo, updatePlantaRepo } from "../repositories/plantaRepositories.js";
import { uploadImage } from "../service/cloudinaryServices.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { errorResponse } from "../utils/errorResponse.js";
import { successResponse } from "../utils/successResponse.js";

export const createProduct = asyncHandler(async (req, res) => {
  let productImage;


  if (req.file) {
    const result = await uploadImage(
      req.file.buffer,
      "ecommerce/products"
    );
    productImage = result.secure_url;

  }

  const data = { ...req.body, productImage, };

  const product = await createPlantaRepo(data);

  if (!product) {
    return errorResponse(res, 500, "Product not created");
  }


  return successResponse(
    res,
    201,
    "Product created successfully",
  );
});




export const getProduct = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));



  const { category, search } = req.query;
  const filter = {};

  if (category) {
    filter.category = category;
  }

  if (typeof search === "string" && search.trim()) {
    filter.productTitle = {
      $regex: search,
      $options: "i",
    };
  }

  const [products, totalProducts] = await Promise.all([
    getPlantaRepo(filter, page, limit),
    countPlantaRepo(filter),
  ]);

  if (!products.length) {
    return errorResponse(res, 404, "Products not found", []);
  }

  const totalPages = Math.ceil(totalProducts / limit);

  return successResponse(res, 200, "Products fetched successfully", {
    products,
    pagination: {
      totalProducts,
      totalPages,
      currentPage: page,
      limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  });
});



export const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return errorResponse(res, 400, "Invalid ID");
  }

  const product = await getPlantaByIdRepo(id);

  if (!product) {
    return errorResponse(res, 404, "Product not found");
  }

  return successResponse(
    res,
    200,
    "Product fetched successfully",
    null,
    null,
    product
  );
});




export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return errorResponse(res, 400, "Invalid product ID");
  }

  const product = await deletePlantaRepo(id);

  if (!product) {
    return errorResponse(res, 404, "Product not found");
  }

  return successResponse(res, 200, "Product deleted successfully");
});



export const updatePlanta = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;



  if (!mongoose.isValidObjectId(id)) {
    return errorResponse(res, 400, "Invalid product ID");
  }
  if (req.file) {
    const result = await uploadImage(
      req.file.buffer,
      "ecommerce/products"
    );

    updateData.productImage = result.secure_url;
  }
  const product = await updatePlantaRepo(id, updateData);

  if (!product) {
    return errorResponse(res, 404, "Product not found");
  }

  return successResponse(
    res,
    200,
    "Product updated successfully",
  );
});
