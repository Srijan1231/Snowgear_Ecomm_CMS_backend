import ProductSchema from "./ProductSchema.js";

export const insertProduct = (obj) => {
  return ProductSchema(obj).save();
};

export const getProducts = () => {
  return ProductSchema.find();
};

export const getProductById = (_id) => {
  return ProductSchema.findById(_id);
};

export const findOneProductByFilter = (filter) => {
  return ProductSchema.findOne(filter);
};

export const updateProductById = ({ _id, ...rest }) => {
  return ProductSchema.findByIdAndUpdate(_id, rest, { new: true });
};

//@filter, @updateObj must be an obj
export const updateproduct = (filter, updateObj) => {
  return ProductSchema.findOneAndUpdate(filter, updateObj, { new: true });
};

export const deleteproductbyId = (_id) => {
  return ProductSchema.findByIdAndDelete(_id);
};
