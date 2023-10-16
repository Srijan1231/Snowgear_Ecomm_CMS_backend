import mongoose from "mongoose";
const orders = mongoose.model("orders", {});

export const getOrder = () => {
  return orders.find();
};

export const getOrderById = (_id) => {
  return orders.findById(_id);
};

export const findOneOrderByFilter = (filter) => {
  return orders.findOne(filter);
};

// export const updateOrderById = ({ _id, ...rest }) => {
//   return orders.findByIdAndUpdate(_id, rest, { new: true });
// };

// //@filter, @updateObj must be an obj
// export const updateorder = (filter, updateObj) => {
//   return orders.findOneAndUpdate(filter, updateObj, { new: true });
// };

// export const deleteorderbyId = (_id) => {
//   return orders.findByIdAndDelete(_id);
// };
