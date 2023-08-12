import ProductSchema from "./ProductSchema.js";

export const insertProduct = (obj) => {
  console.log(obj);
  return ProductSchema(obj).save();
};

export const getProducts = () => {
  return ProductSchema.find();
};

export const updateProductById = ({ _id, ...rest }) => {
  return ProductSchema.findByIdAndUpdate(_id, rest);
};
//@filter, @updateObj must be an obj
export const findOneProductByfilter = ({ filter }) => {
  return ProductSchema.findOne(filter);
};

export const deleteProductbyId = (_id) => {
  return ProductSchema.findByIdAndDelete(_id);
};
