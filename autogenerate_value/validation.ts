import Joi from "joi";
export const registerHPValidation = Joi.object({
  motorSerialNumber: Joi.string().required().messages({
    "any.required": "motorSerialNumber cannot be empty or null ",
  }),
  motorHp: Joi.number().required().messages({
    "any.required": "motorHp cannot be empty ",
    "number.base": "motorHp must be an number",
  }),

  modelNumber: Joi.string().required().messages({
    "any.required": "modelNumber cannot be empty ",
  }),
  controllerSerialNumber: Joi.string().required().messages({
    "any.required": "controllerSerialNumber cannot be empty ",
  }),
  rmsDeviceId: Joi.string().required().messages({
    "any.required": "rmsDeviceId cannot be empty ",
  }),
  headSize: Joi.number().required().messages({
    "any.required": "headSize cannot be empty ",
    "number.base": "headSize must be an number",
  }),
  motorCategory: Joi.string().required().messages({
    "any.required": "motorCategory cannot be empty ",
  }),
});
