import { Op } from "sequelize";
import APIError from "../utils/api-error";
import { QC } from "../qc/model";
import { Order } from "../order/model";

export async function downloadMotorDeviceDetails(
  sDate: string,
  eDate: string,
  orderId: string
) {
  try {
    const order = await Order.findOne({
      where: {
        id: orderId,
      },
    });
    if (!order) {
      throw new APIError(" invlaid order id ", " INVALID ORDER ID ");
    }
    if (sDate && eDate) {
      let startDate = new Date(`${sDate}`);
      let endDate = new Date(`${eDate}`);
      console.log(startDate, endDate, " is UTC time ");
      startDate.setUTCHours(0, 0, 0, 1);
      endDate.setUTCHours(23, 59, 59, 59);
      console.log(startDate, endDate);
      return await QC.findAll({
        where: {
          createdAt: {
            [Op.gt]: startDate,
            [Op.lt]: endDate,
          },
          orderId,
          isUpdated: true,
        },
        attributes: ["motorSerialNumber"],
      });
    } else {
      throw new APIError("select date ", " SELECT DATE ");
    }
  } catch (error) {
    throw new APIError((error as APIError).message, (error as APIError).code);
  }
}
