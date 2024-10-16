import { create } from "domain";
import Pdi from "./model";
import APIError from "../utils/api-error";
import { Order } from "../order/model";
import { GeneratePdiName } from "./utils";
import { QC } from "../qc/model";
import { autogenerate } from "../autogenerate_value/module";
import { Autogenerate_Value } from "../autogenerate_value/model";

export async function GetAllPdiOrder() {
  try {
    const orders = await Order.findAll({ where: { type: "POD" } });
    if (orders.length === 0) {
      return "No orders belong to POD";
    }
    return orders;
  } catch (error) {
    throw new APIError((error as APIError).message, (error as APIError).code);
  }
}

export async function generate_And_BlockModelNo_PumbSLNO_ControllerSL(
  motor_hp: string,
  head_size: string,
  motor_category: string,
  controller_box_type: string,
  orderCount: number,
  orderId: string,
  motorType: string
) {
  try {
    const pdi_name = await GeneratePdiName(motor_hp, head_size, orderId);
    const pdiRecord = await Pdi.create({
      motor_hp: motor_hp,
      motor_category: motor_category,
      head_size: head_size,
      controller_box_type: controller_box_type,
      orderCount: orderCount,
      orderId: orderId,
      pdi_Name: pdi_name,
    });
    let j = [];
    for (let i = 0; i < orderCount; i++) {
      let controllerserialnumber: any = await autogenerate(
        Number(motor_hp),
        Number(head_size),
        motor_category,
        "controllerserialnumber",
        motorType,
        controller_box_type
      );
      let modelNumber = "2000";
      let pumbslnumber = "25000";
      let distributorid: string = "djfaf";
      const c = await QC.create({
        motorHp: motor_hp,
        headSize: head_size,
        controllerBoxType: controller_box_type,
        controllerSerialNumber: controllerserialnumber,
        modelNumber: modelNumber,
        motorSerialNumber: pumbslnumber,
      });
      const from_db = await Autogenerate_Value.findOne({
        where: {
          motorHp: Number(motor_hp),
          headSize: Number(head_size),
          motorCategory: motor_category,
        },
      });
      if (from_db) {
        from_db.controllerSerialNumber = controllerserialnumber;
        await from_db.save();
      }
      j.push(c);
    }
    return j;
  } catch (error) {
    throw new APIError((error as APIError).message, (error as APIError).code);
  }
}
