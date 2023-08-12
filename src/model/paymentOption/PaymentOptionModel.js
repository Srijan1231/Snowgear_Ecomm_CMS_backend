import PaymentOptionSchema from "./PaymentOptionSchema.js";

export const insertPaymentOption = (obj) => {
  return PaymentOptionSchema(obj).save();
};

export const getPaymentsOption = () => {
  return PaymentOptionSchema.find();
};

export const updatePaymentOptionById = ({ _id, ...rest }) => {
  return PaymentOptionSchema.findByIdAndUpdate(_id, rest);
};
//@filter, @updateObj must be an obj
export const updatePaymentOption = (filter, updateObj) => {
  return PaymentOptionSchema.findOneAndUpdate(filter, updateObj, { new: true });
};

export const deletePaymentOptionbyId = (_id) => {
  return PaymentOptionSchema.findByIdAndDelete(_id);
};
