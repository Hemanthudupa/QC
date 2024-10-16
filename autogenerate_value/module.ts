import { Op } from "sequelize";
import { registerHP, rmsDetails } from "../types";
import APIError from "../utils/api-error";
import { Autogenerate_Value } from "./model";
import { registerHPValidation } from "./validation";
import Distributor from "../distributor/model";
import sequelize from "sequelize";
import { User } from "../users/model";
import Consumer from "../consumer/model";

export async function registerHP(data: registerHP) {
  try {
    const validatedData = await registerHPValidation.validateAsync(data);
    const {
      headSize,
      motorHp,
      rmsDeviceId,
      motorSerialNumber,
      controllerSerialNumber,
      modelNumber,
    } = validatedData;
    const autogenVal = await Autogenerate_Value.findOne({
      where: {
        headSize,
        motorHp,
        [Op.or]: [
          { rmsDeviceId },
          // { motorSerialNumber },
          { controllerSerialNumber },
          { modelNumber },
        ],
      },
    });
    if (autogenVal) {
      throw new APIError(
        "hp or headsize or rmsDeviceId  or controllerSerialNumber or modelNumber  already registered  ",
        " DUPLICATE  INFO"
      );
    }
    const value = await Autogenerate_Value.create(validatedData);
    return {
      message: " details registered successfully ",
      data: value,
    };
  } catch (error) {
    throw new APIError((error as APIError).message, (error as APIError).code);
  }
}

export async function autogenerate(
  motorHp: number,
  headSize: number,
  motorCategory: string,
  options: string,
  motorType: string,
  controllerBoxType: string
) {
  try {
    if (motorHp && headSize && motorCategory) {
      const dataFromDb = await Autogenerate_Value.findOne({
        where: {
          motorHp,
          headSize,
          motorCategory,
        },
      });
      if (!dataFromDb) {
        throw new APIError(" data not found ");
      }
      if (options.toLocaleLowerCase() == "controllerserialnumber") {
        const conSerialNum = dataFromDb?.controllerSerialNumber.slice(
          0,
          15
        ) as string;
        const conSerialNumCount = Number(
          dataFromDb?.controllerSerialNumber.split("M")[1].slice(6)
        );

        dataFromDb!.controllerSerialNumber =
          conSerialNum + (conSerialNumCount + 1);
        console.log(conSerialNum, conSerialNumCount);

        return dataFromDb?.controllerSerialNumber;
      } else if (options.toLocaleLowerCase() == "motorserialnumber") {
        // let [firstHalf, secondHalf] = dataFromDb?.motorSerialNumber.split(
        //   "-"
        // ) as string[];
        // secondHalf = Number(secondHalf) + 1 + "";
        // const date = new Date();
        // const month = date.getMonth() + "".padStart(2, "0");
        // console.log(month, date.getFullYear());
        // firstHalf = firstHalf.slice(0, 7) + date.getFullYear();
        // dataFromDb!.motorSerialNumber = firstHalf + "-" + secondHalf;
        // return dataFromDb?.motorSerialNumber;

        let firstHalf;
        if (headSize == 100 && dataFromDb.motorSerialNumber.includes("SDW")) {
          firstHalf = dataFromDb?.motorSerialNumber.slice(0, 8);
          // console.log(firstHalf, "  if");
        } else if (
          headSize != 100 &&
          dataFromDb.motorSerialNumber.includes("SDW")
        ) {
          firstHalf = dataFromDb?.motorSerialNumber.slice(0, 7);
          // console.log(
          //   firstHalf,
          //   "  else if motorserialnumber SDW head not 100"
          // );
        } else if (
          headSize == 100 &&
          dataFromDb.motorSerialNumber.includes("SF")
        ) {
          firstHalf = dataFromDb?.motorSerialNumber.slice(0, 7);
          // console.log(firstHalf, "  else if motorserialnumber SF head 100");
        } else {
          firstHalf = dataFromDb?.motorSerialNumber.slice(0, 6);
          // console.log(firstHalf, " else  ");
        }
        const date = new Date();
        const month = `${date.getMonth() + 1}`.padStart(2, "0");
        const year = date.getFullYear();

        firstHalf = firstHalf + month + year;

        let secondHalf = Number(dataFromDb?.motorSerialNumber.slice(13));

        secondHalf = secondHalf + 1;
        return (dataFromDb!.motorSerialNumber = firstHalf + secondHalf);
      } else if (options.toLocaleLowerCase() == "modelnumber") {
        return dataFromDb?.modelNumber;
      }
    } else
      throw new APIError(
        " motor HP or HeadSize or motorCategary or options is not provided",
        "MOTOR HP OR HEADSIZE OR MOTORCATEGARY OR OPTIONS  IS NOT PROVIDED"
      );
  } catch (error) {
    throw new APIError((error as APIError).message, (error as APIError).code);
  }
}

export async function getDistributor(
  page: number,
  pageSize: number,
  search: string
) {
  try {
    const limit = pageSize;
    const offset = (page - 1) * pageSize;
    const data = await Distributor.findAll({
      attributes: [
        "id",
        "businessName",
        "businessGST",
        "address",
        "state",
        "firstName",
        "createdAt",
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM consumer WHERE consumer."distributorId" = Distributor.id AND consumer."userId" IN (SELECT id FROM "users" WHERE "isActive" = true AND "userRole" = \'CONSUMER\'))'
          ),
          "activeConsumerCount",
        ],
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM consumer WHERE consumer."distributorId" = Distributor.id AND consumer."userId" IN (SELECT id FROM "users" WHERE "isActive" = false AND "userRole" = \'CONSUMER\'))'
          ),
          "inActiveConsumerCount",
        ],
      ],

      include: [
        {
          model: Consumer,
          as: "consumer",
          attributes: [],
          include: [
            {
              model: User,
              as: "user",
            },
          ],
        },
        {
          model: User,
          as: "user",
          attributes: ["isActive"],
          where: { isActive: true },
        },
      ],
      where: {
        businessName: { [Op.like]: `%${search}%` },
      },
      order: [["createdAt", "DESC"]],

      offset,
      limit,
    });

    return data;
  } catch (e) {
    throw new APIError((e as APIError).message, (e as APIError).code);
  }
}
