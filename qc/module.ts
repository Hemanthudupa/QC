import { Op } from "sequelize";
import { rmsDetails, product_set } from "../types";
import APIError from "../utils/api-error";
import { QC } from "./model";
import { rmsDetailsAuth } from "./authenticate";
import { Autogenerate_Value } from "../autogenerate_value/model";
import { Order } from "../order/model";
import Distributor from "../distributor/model";

export async function addRmsDetails(
  rmsDetails: rmsDetails,
  options: product_set
) {
  try {
    if (
      options == "PMC" ||
      options == "C" ||
      options == "PM" ||
      options == "P"
    ) {
      const validatedData = await rmsDetailsAuth.validateAsync(rmsDetails);
      const {
        motorSerialNumber,
        motorHp,
        modelNumber,
        controllerSerialNumber,
        rmsDeviceId,
        headSize,
        motorCategory,
        orderId,
        distributorId,
      } = validatedData;

      // const whereClause: any = {};
      const arrClause: any = [];
      if (motorSerialNumber) {
        // whereClause.motorSerialNumber = motorSerialNumber;
        arrClause.push({
          motorSerialNumber,
        });
      }
      if (controllerSerialNumber) {
        // whereClause.controllerSerialNumber = controllerSerialNumber;
        arrClause.push({
          controllerSerialNumber,
        });
      }
      const QcFromDb = await QC.findOne({
        where: {
          [Op.or]: arrClause,
          motorCategory,
        },
      });

      console.log(QcFromDb?.dataValues);

      if (QcFromDb) {
        throw new APIError("duplicate properties ", "DUPLICATE INPUTS");
      }

      const order = await Order.findOne({
        where: {
          id: orderId,
          qcCount: {
            [Op.gt]: 0,
          },
        },
      });
      if (!order) {
        throw new APIError(
          "invlaid order Id or count is 0",
          " INVLAID ORDER ID  OR COUNT IS 0"
        );
      }

      let createdData;

      if (validatedData.imeiNo) {
        const dataFromDb = await QC.findOne({
          where: {
            [Op.or]: [{ imeiNo: validatedData.imeiNo }],
          },
        });
        if (!dataFromDb) {
          throw new APIError("invalid imei ", "  INVALID IMEI ");
        } else if (dataFromDb.isUpdated != false) {
          throw new APIError(
            "this IMEI is already updated ",
            " ALREADY UPDATED"
          );
        }
        const distributorFromDb = await Distributor.findOne({
          where: {
            id: distributorId,
          },
        });
        if (!distributorFromDb) {
          throw new APIError(
            "invlaid distributor id ",
            "INVALID DISTRIBUTOR ID "
          );
        }

        dataFromDb.controllerSerialNumber =
          validatedData.controllerSerialNumber;
        dataFromDb.motorSerialNumber = validatedData.motorSerialNumber;
        dataFromDb.rmsDeviceId = validatedData.rmsDeviceId;
        dataFromDb.modelNumber = validatedData.modelNumber;
        dataFromDb.distributorId = validatedData.distributorId;

        dataFromDb.simOperator = validatedData.simOperator;

        dataFromDb.controllerRequirement = validatedData.controllerRequirement;

        dataFromDb.headSize = validatedData.headSize;

        dataFromDb.controllerBoxType = validatedData.controllerBoxType;

        dataFromDb.rmsRequirement = validatedData.rmsRequirement;

        dataFromDb.state = validatedData.state;

        dataFromDb.controllerBoxColor = validatedData.controllerBoxColor;

        dataFromDb.pumpType = validatedData.pumpType;

        dataFromDb.motorHp = validatedData.motorHp;

        dataFromDb.motorType = validatedData.motorType;

        dataFromDb.nodalAgency = validatedData.nodalAgency;

        dataFromDb.motorSize = validatedData.motorSize;

        dataFromDb.simNumber = validatedData.simNumber;

        dataFromDb.simPhoneNumber = validatedData.simPhoneNumber;

        dataFromDb.motorCategory = validatedData.motorCategory;

        dataFromDb.networkType = validatedData.networkType;
        dataFromDb.orderId = validatedData.orderId;
        dataFromDb.isUpdated = true;
        dataFromDb.product_set = options;

        createdData = await dataFromDb.save(validatedData);
      } else if (
        options.toLowerCase() == "pm" ||
        options.toLowerCase() == "p"
      ) {
        validatedData.product_set = options;
        validatedData.isUpdated = true;
        createdData = await QC.create(validatedData);
      }
      const autogenerate_Value_fromDB = await Autogenerate_Value.findOne({
        where: {
          motorHp,
          headSize,
          motorCategory: motorCategory || "AC",
        },
      });

      autogenerate_Value_fromDB!.motorSerialNumber = motorSerialNumber;

      autogenerate_Value_fromDB!.controllerSerialNumber =
        controllerSerialNumber;
      await autogenerate_Value_fromDB?.save();

      order!.qcCount = order!.qcCount - 1;
      await order?.save();

      return {
        message: "Successfully created RMS Details",
        data: {
          createdData,
        },
      };
    } else {
      throw new APIError("give correct option", " INVALID OPTIONS");
    }
  } catch (error) {
    throw new APIError((error as APIError).message, (error as APIError).code);
  }
}

export async function getRmsDetails(imeiNo: string) {
  try {
    const rmsDetails = await QC.findOne({
      include: {
        model: Distributor,
        as: "distributor",
        attributes: ["businessName", "id"],
      },
      where: { imeiNo },
    });

    if (!rmsDetails) {
      throw new APIError("invlaid IMEI number", "INVALID IMEI");
    }
    return rmsDetails;
  } catch (error) {
    throw new APIError((error as APIError).message, (error as APIError).code);
  }
}

export async function downloadQcDetails(
  options: string,
  date1: string,
  date2: string,
  orderId: string
) {
  try {
    const order = await Order.findOne({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      throw new APIError("invalid orderId ", " INVLAID ORDER ID ");
    }
    console.log(order);
    let startDate = new Date(`${date1}`); //YYYY-MM-DD
    let endDate = new Date(`${date2}`); //YYYY-MM-DD

    startDate.setUTCHours(0, 0, 0, 1);
    endDate.setUTCHours(23, 59, 59, 59);

    console.log(startDate, endDate);

    if (options) {
      if (options.toLowerCase() == "pmc") {
        const responseData = await QC.findAll({
          where: {
            updatedAt: {
              [Op.gte]: startDate,
              [Op.lte]: endDate,
            },
            orderId,
            isUpdated: true,
            product_set: "PMC",
          },
          include: [
            {
              model: Distributor,
              as: "distributor",
              attributes: ["businessName"],
            },
            {
              model: Order,
              as: "order",
              attributes: ["orderNumber"],
            },
          ],
          order: [["updatedAt", "ASC"]],
        });
        return responseData;
      } else if (options.toLowerCase() == "c") {
        return await QC.findAll({
          where: {
            updatedAt: {
              [Op.gte]: startDate,
              [Op.lte]: endDate,
            },
            orderId,
            isUpdated: true,
            product_set: "C",
          },
          include: [
            {
              model: Distributor,
              as: "distributor",
              attributes: ["businessName"],
            },
            {
              model: Order,
              as: "order",
              attributes: ["orderNumber"],
            },
          ],
          order: [["updatedAt", "ASC"]],
        });
      } else if (options.toLowerCase() == "pm") {
        return await QC.findAll({
          where: {
            product_set: "PM",
            updatedAt: {
              [Op.gte]: startDate,
              [Op.lte]: endDate,
            },
            isUpdated: true,
            orderId,
          },
          include: [
            {
              model: Distributor,
              as: "distributor",
              attributes: ["businessName"],
            },
            {
              model: Order,
              as: "order",
              attributes: ["orderNumber"],
            },
          ],
          order: [["updatedAt", "ASC"]],
        });
      } else if (options.toLowerCase() == "p") {
        return await QC.findAll({
          where: {
            product_set: "P",
            updatedAt: {
              [Op.gte]: startDate,
              [Op.lte]: endDate,
            },

            isUpdated: true,

            orderId,
          },
          include: [
            {
              model: Distributor,
              as: "distributor",
              attributes: ["businessName"],
            },
            {
              model: Order,
              as: "order",
              attributes: ["orderNumber"],
            },
          ],
          order: [["updatedAt", "ASC"]],
        });
      } else {
        throw new APIError(" give proper option ", "INVALID OPTION");
      }
    } else {
      throw new APIError(" give proper option ", "INVALID OPTION");
    }
  } catch (error) {
    throw new APIError((error as APIError).message, (error as APIError).code);
  }
}
