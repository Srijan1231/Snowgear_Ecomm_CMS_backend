import Joi from "joi";

const SHORTSTRREQ = Joi.string().min(3).max(100).required();
const SHORTSTR = Joi.string().min(3).max(100);
const LONGSTR = Joi.string().min(3).max(1000);
const NUMREQ = Joi.number().required();
const NUM = Joi.number();

// ======== admin
export const newAdminValidation = (req, res, next) => {
  try {
    //define the schema
    const schema = Joi.object({
      fName: SHORTSTRREQ,
      lName: SHORTSTRREQ,
      email: SHORTSTR.email({ minDomainSegments: 2 }).required(),
      phone: SHORTSTRREQ,
      address: SHORTSTR.allow(""),
      password: SHORTSTRREQ.min(6),
    });

    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};
export const loginValidation = (req, res, next) => {
  try {
    //define the schema
    const schema = Joi.object({
      email: SHORTSTR.email({ minDomainSegments: 2 }).required(),
      password: SHORTSTRREQ.min(6),
    });

    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};

export const newAdminVerificationValidation = (req, res, next) => {
  try {
    //define the schema
    const schema = Joi.object({
      e: SHORTSTRREQ.email({ minDomainSegments: 2 }),
      c: SHORTSTRREQ,
    });

    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};

// ======== category
export const updateCatValidation = (req, res, next) => {
  try {
    //define the schema
    const schema = Joi.object({
      _id: SHORTSTRREQ,
      title: SHORTSTRREQ,
      status: SHORTSTRREQ,
    });

    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};
// ======== payment

export const updatePaymentValidation = (req, res, next) => {
  try {
    //define the schema
    const schema = Joi.object({
      _id: SHORTSTRREQ,
      title: SHORTSTRREQ,
      status: SHORTSTRREQ,
    });

    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};
export const newProductValidation = (req, res, next) => {
  try {
    req.body.salesPrice = req.body.salesPrice || 0;
    const schema = Joi.object({
      name: SHORTSTRREQ,
      status: SHORTSTRREQ,
      parentCat: SHORTSTRREQ,
      price: NUMREQ,
      qty: NUMREQ,
      sku: SHORTSTRREQ,
      salesPrice: NUM,
      description: LONGSTR,
      salesStartDate: SHORTSTR.allow("", null),
      salesEndDate: SHORTSTR.allow("", null),
    });
    const { error } = schema.validate(req.body);
    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};
