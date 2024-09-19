import Joi from "joi";

export const embedAddRmsDetaisValidation = Joi.object({
  distributorId: Joi.string().disallow(null, "").required().messages({
    "string.base": "distributorId string be UUID string format",
    "any.required": "distributorId is required filed",
  }),
  imeiNo: Joi.string().length(15).required().messages({
    "string.base": "imeiNo should be  string format",
    "any.required": "imeiNo is required filed",
  }),
  simPhoneNumber: Joi.string().optional().messages({
    "string.base": "simPhoneNumber should be  string format",
    "any.required": "simPhoneNumber is required filed",
  }),
  simNumber: Joi.string().optional().messages({
    "string.base": "simNumber should be  string format",
    "any.required": "simNumber is required filed",
  }),
  simOperator: Joi.string().optional().messages({
    "string.base": "simOperator should be  string format",
    "any.required": "simOperator is required filed",
  }),
  networkType: Joi.string().optional().messages({
    "string.base": "networkType should be  string format",
    "any.required": "networkType is required filed",
  }),
  rmsDeviceId: Joi.string().optional().messages({
    "string.base": "rmsDeviceId should be  string format",
    "any.required": "rmsDeviceId is required filed",
  }),
});
