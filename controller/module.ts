import { Op } from "sequelize";
import { QC } from "../qc/model";
import APIError from "../utils/api-error";

export async function downloadControllerDeviceDetails(
  sDate: string,
  eDate: string
) {
  try {
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
        },
        attributes: ["controllerSerialNumber", "rmsDeviceId", "imeiNo"],
      });
    } else {
      throw new APIError("select date ", " SELECT DATE ");
    }
  } catch (error) {
    throw new APIError((error as APIError).message, (error as APIError).code);
  }
}
