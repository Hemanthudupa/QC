import { Op } from "sequelize";
import { OrderDetails } from "../types";
import APIError from "../utils/api-error";
import { Order } from "./model";
import { OderDetailsVal ,PDIOderDetailsVal } from "./validation";

export async function registerOrder(orderDetails: OrderDetails) {
  try {
    
    const orderFromDb = await Order.findOne({
      where: {
        orderNumber: orderDetails.orderNumber,
      },
    });
    if (orderFromDb) {
      throw new APIError("duplicate order number ", " DUPLICATE ORDER NUMBER ");
    }
    if (orderDetails.type=="PDI"){
      const validatedOrderDetails = await PDIOderDetailsVal.validateAsync(
        orderDetails
      );
      const data = await Order.create(validatedOrderDetails);
      return {
        message: "successfully created PDI order ",
        data,
      };
    }
    const validatedOrderDetails = await OderDetailsVal.validateAsync(
      orderDetails
    );

    if (validatedOrderDetails.count == 0) {
      validatedOrderDetails.status = "COMPLETED";
    } else {
      validatedOrderDetails.embedCount = validatedOrderDetails.count;
      validatedOrderDetails.qcCount = validatedOrderDetails.count;
    }

    const data = await Order.create(validatedOrderDetails);
    return {
      message: "successfully created order details ",
      data,
    };
  } catch (error) {
    throw new APIError((error as APIError).message, (error as APIError).code);
  }
}

// export async function getAllOrderDetails(option: string) {
export async function getAllOrderDetails(option: string) {
  try {
    const whereCondition: any = {};
    if (option && option.toLowerCase() == "qc") {
      whereCondition["qcCount"] = {
        [Op.gte]: 0,
      };
    } else if (option && option.toLowerCase() == "embed") {
      whereCondition["embedCount"] = {
        [Op.gte]: 0,
      };
    } else {
      throw new APIError("please provide valid option", "INVALID OPTIONS");
    }

    console.log(whereCondition);
    const orders = await Order.findAll({
      where: {
        count: { [Op.gt]: 0 },
        status: "ONGOING",
        ...whereCondition,
        ...whereCondition,
      },
    });
    if (orders.length > 0) {
      return orders;
    } else {
      return {
        message: "no orderId registered yet!!!",
      };
    }
  } catch (error) {
    throw new APIError((error as APIError).message, (error as APIError).code);
  }
}

export async function updateOrderDetails(orderId: string, count: number) {
  try {
    const orderFromDb = await Order.findOne({
      where: { orderNumber: orderId },
    });
    if (orderFromDb) {
      if (count > 0) {
        orderFromDb.status = "ONGOING";

        orderFromDb.count = Number(orderFromDb.count) + count;
        orderFromDb.embedCount = Number(orderFromDb.embedCount) + count;
        orderFromDb.qcCount = Number(orderFromDb.qcCount) + count;
        const data = await orderFromDb.save();
        return {
          message: `count updated for this orderId ${orderId}`,
          data,
        };
      } else if (count == 0 && orderFromDb.status == "COMPLETED") {
        return {
          message: " already count is 0  ",
        };
      }
    } else {
      return {
        message: " invalid order id ",
      };
    }
  } catch (error) {
    throw new APIError((error as APIError).message, (error as APIError).code);
  }
}
