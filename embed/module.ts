import { Op } from "sequelize";
import { QC } from "../qc/model";
import { embedRmsDetails } from "../types";
import APIError from "../utils/api-error";
import { embedAddRmsDetaisValidation } from "./validation";
import Distributor from "../distributor/model";
import { Autogenerate_Value } from "../autogenerate_value/model";
import { Order } from "../order/model";

export async function embedAddRmsDetais(
  embedRmsDetails: embedRmsDetails,
  orderId: string
) {
  try {
    const orderFromDb = await Order.findOne({
      where: {
        id: orderId,
        embedCount: {
          [Op.gt]: 0,
        },
      },
    });

    if (!orderFromDb) {
      throw new APIError("invalid Order id ", "INVALID ORDER ID ");
    }

    console.log(orderFromDb.dataValues, " is the order came from db ");

    const validatedEmbedAddRmsDetails =
      await embedAddRmsDetaisValidation.validateAsync(embedRmsDetails);

    const { imeiNo, distributorId, rmsDeviceId } = validatedEmbedAddRmsDetails;

    let arrCondition = [];
    if (imeiNo) {
      arrCondition.push({ imeiNo: imeiNo });
    }
    if (rmsDeviceId) {
      arrCondition.push({ rmsDeviceId: rmsDeviceId });
    }
    const distributor = await Distributor.findOne({
      where: {
        id: distributorId,
      },
    });

    if (!distributor) {
      throw new APIError("invalid distributor id ", " INVALID DISTRIBUTOR ID ");
    }

    const QcFromDb = await QC.findOne({
      where: {
        [Op.or]: arrCondition,
      },
    });

    if (QcFromDb) {
      throw new APIError(
        "duplicate imei number or rmsRmsDeviceID ",
        "DUPLICATE IMEI OR RMSDEVICEID"
      );
    }
    // const autogenerate_Value_fromDB = await Autogenerate_Value.findOne({
    //   limit: 1,
    //   offset: 0,
    //   order: [["id", "ASC"]],
    // });
    // autogenerate_Value_fromDB!.rmsDeviceId = rmsDeviceId;
    // await autogenerate_Value_fromDB?.save();

    const createdData = await QC.create(validatedEmbedAddRmsDetails);
    orderFromDb.embedCount = orderFromDb.embedCount - 1;
    await orderFromDb.save();
    return {
      message: "data successfully created  by EMBDED team",
      data: createdData,
    };
  } catch (error) {
    throw new APIError((error as APIError).message, (error as APIError).code);
  }
}

export async function generateRmsDeviceId(options: string, imeiNo: string) {
  try {
    const autogenerate_value = await QC.findOne({
      limit: 1,
      offset: 0,
      order: [["createdAt", "DESC"]],
      where: {
        networkType: options.toUpperCase(),
        rmsDeviceId: {
          [Op.not]: null as any,
        },
      },
    });
    console.log(autogenerate_value?.dataValues);

    console.log(options);

    if (options.toLocaleLowerCase() == "2g") {
      let [first, second, third] = autogenerate_value?.rmsDeviceId.split(
        "-"
      ) as string[];
      console.log(third, " is the third ");

      third = String(Number(third) + 1).padStart(5, "0000");
      return [first, second, third].join("-") as string;
    } else if (options.toLocaleLowerCase() == "4g") {
      return `EC200U-${imeiNo.slice(-5)}`;
    }
  } catch (error) {
    throw new APIError((error as APIError).message, (error as APIError).code);
  }
}
