import { NextFunction, Response, Request } from "express";
import { Router } from "express";
import {
  generate_And_BlockModelNo_PumbSLNO_ControllerSL,
  GetAllPdiOrder,
} from "./module";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get(
  "/pdiOrders",
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

router.post(
  "/generatepdi",
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

export default router;
