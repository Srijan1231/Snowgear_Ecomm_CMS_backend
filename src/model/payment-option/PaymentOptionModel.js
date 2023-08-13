import PaymentOptionSchema from "./PaymentOptionSchema.js";

export const insertPO = (obj) => {
  return PaymentOptionSchema(obj).save();
};

export const getPOs = (obj) => {
  return PaymentOptionSchema.find();
};

export const updatePOById = ({ _id, ...rest }) => {
  return PaymentOptionSchema.findByIdAndUpdate(_id, rest);
};

export const deletePO = (_id) => {
  return PaymentOptionSchema.findByIdAndDelete(_id);
};
