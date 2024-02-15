import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ProductModel, { ProductDocument, ProductInput } from "../models/product.model";
import { databaseResponseTimeHistogram } from "../utils/metrics";

export const createProduct = async (input: ProductInput) => {
  const metricsLabels = {
    operation: "createProduct",
  };
  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const result = await ProductModel.create(input);
    timer({ ...metricsLabels, success: "true" });

    return result;
  } catch (error) {
    console.log(error);
    timer({ ...metricsLabels, success: "false" });
    console.log("Error creating Product");
  }
};

export const findProduct = async (
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) => {
  const metricsLabels = {
    operation: "findProduct",
  };
  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await ProductModel.findOne(query, {}, options);

    timer({ ...metricsLabels, success: "true" });

    return result;
  } catch (error) {
    console.log(error);
    timer({ ...metricsLabels, success: "false" });
    console.log("Error finfing Product");
  }
};

export const findAndUpdateProduct = async (
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions
) => {
  return await ProductModel.findOneAndUpdate(query, update, options);
};

export const deleteProduct = async (query: FilterQuery<ProductDocument>) => {
  return await ProductModel.deleteOne(query);
};
