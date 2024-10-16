import Joi from "joi";


const orderSchema = Joi.object({
    orderId: Joi.string().required(),
    motor_hp: Joi.string().required(),
    head_size: Joi.string().required(),
    motor_category: Joi.string().required(),
    controller_box_type: Joi.string().required(),
    orderCount: Joi.string().required()
  });
export const OrderDetailsValidation = Joi.array().items(orderSchema).required();