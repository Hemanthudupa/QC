import Joi from "joi";
import { MOTOR_CATEGORY } from "../utils/constants";

export const rmsDetailsAuth = Joi.object({
  motorSerialNumber: Joi.string().optional().messages({
    "any.required": "motorSerialNumber is required , cant be empty",
    "string.base": "motorSerialNumber should be string",
  }),
  motorHp: Joi.number().required().messages({
    "any.required": "motorHp is required , cant be empty",
    "number.base": "motorHp should be number ",
    "number.max": "motorHp should be one digit ",
    "number.min": "motorHp should be one digit ",
  }),
  modelNumber: Joi.string().optional().messages({
    "any.required": "modelNumber is required , cant be empty",
    "string.base": "modelNumber should be string",
  }),
  controllerSerialNumber: Joi.string().optional().messages({
    "any.required": "controllerSerialNumber is required , cant be empty",
    "string.base": "controllerSerialNumber should be string",
  }),
  rmsDeviceId: Joi.string().optional().messages({
    "any.required": "rmsDeviceId is required , cant be empty",
    "string.base": "rmsDeviceId should be string",
  }),
  headSize: Joi.number().required().messages({
    "any.required": "headSize is required , cant be empty",
    "number.base": "headSize should be number ",
  }),
  motorCategory: Joi.string().optional().messages({
    "any.required": "motorCategory is required , cant be empty",
    "string.base": "motorCategory should be string",
  }),
  state: Joi.string().required().messages({
    "any.required": "state is required , cant be empty",
  }),
  controllerBoxColor: Joi.string().optional().messages({
    "string.base": "controllerBoxColor should be string",
  }),
  controllerBoxType: Joi.string().optional().messages({
    "string.base": "controllerBoxType should be string",
  }),
  rmsRequirement: Joi.boolean().messages({
    "boolean.base": "controllerBoxType should be string",
  }),
  controllerRequirement: Joi.boolean().messages({
    "boolean.base": "controllerRequirement should be string",
  }),
  pumpType: Joi.string().optional().messages({
    "string.base": "controllerBoxType should be string",
  }),
  motorType: Joi.string().optional().messages({
    "string.base": "controllerBoxType should be string",
  }),
  nadalAgency: Joi.string().optional().messages({
    "string.base": "controllerBoxType should be string",
  }),
  motorSize: Joi.string().optional().messages({
    "string.base": "controllerBoxType should be string",
  }),
  imeiNo: Joi.string().length(15).optional().messages({
    "string.base": "imeiNo should be string",
    "string.length": "imeiNo should be 15 digits",
  }),
  distributorId: Joi.string().required().messages({
    "string.base": "controllerBoxType should be string",
  }),
  simPhoneNumber: Joi.string().optional().messages({
    "string.base": "simPhoneNumber should be string",
  }),
  simNumber: Joi.string().optional().messages({
    "string.base": "simNumber should be string",
  }),
  simOperator: Joi.string().optional().messages({
    "string.base": "simPhoneNumber should be string",
  }),
  nodalAgency: Joi.string().optional().messages({
    "string.base": "simPhoneNumber should be string",
  }),
  networkType: Joi.string().optional().messages({
    "string.base": "simPhoneNumber should be string",
  }),
  orderId: Joi.string().required().messages({
    "any.required": "OrderId is mandatory , cannot be empty",
  }),
});
