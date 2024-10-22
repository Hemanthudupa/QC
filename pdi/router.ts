import { NextFunction, Response, Request } from "express";
import { Router } from "express";
import {
  embeded_Assign,
  generate_And_BlockModelNo_PumbSLNO_ControllerSL,
  GetAllPdiOrder,
  GetPdiOrderName,
} from "./module";
import { StatusCodes } from "http-status-codes";
import { string } from "joi";

const router = Router();

router.get(
  "/getAll-pdiOrders",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Orders = await GetAllPdiOrder();
      console.log(Orders);
      res.status(StatusCodes.OK).send(Orders);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/get-pdiorder/:orderid",
  async (req: Request, res: Response, next: NextFunction) => {
    const orderid = req.params.orderid;
    try {
      const Order = await GetPdiOrderName(orderid);
      console.log(Order);
      res.status(StatusCodes.OK).send(Order);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/block-pdi-orders",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        motor_hp,
        head_size,
        motor_category,
        controller_box_type,
        orderCount,
        orderId,
        motorType,
      } = req.body;
      const genereated = await generate_And_BlockModelNo_PumbSLNO_ControllerSL(
        motor_hp,
        head_size,
        motor_category,
        controller_box_type,
        orderCount,
        orderId,
        motorType
      );
      console.log(genereated);
      res.status(StatusCodes.OK).send(genereated);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/assign-rmsDeviceId",
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    try {
      const Order = await embeded_Assign(data);
      console.log(Order);
      res.status(StatusCodes.OK).send(Order);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
