import Joi from "joi";

export const OderDetailsVal = Joi.object({
  orderNumber: Joi.string().required().messages({
    "string.base": "orderNumber string be UUID string format",
    "any.required": "orderNumber is required filed",
  }),
  count: Joi.number().required().messages({
    "number.base": "count string be UUID string format",
    "any.required": "count is required filed",
  }),
  status: Joi.boolean().optional().messages({
    "boolean.base": "status should true or false boolean value ",
  }),
});
