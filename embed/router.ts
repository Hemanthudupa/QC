import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { embedAddRmsDetais, generateRmsDeviceId } from "./module";
import { updateOrderDetails } from "../order/module";
import { ensureEmbed } from "../utils/authentication";
const route = Router();
route.use(ensureEmbed);

route.post(
  "/emded-add-rmsDetails/:orderId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body as any;
      const { orderId } = req.params as any;
      res
        .status(StatusCodes.CREATED)
        .send(await embedAddRmsDetais(data, orderId));
    } catch (error) {
      next(error);
    }
  }
);

route.get(
  "/generate-rmsDeviceId/:option",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { option } = req.params;
      const { imeiNo } = req.query;
      res
        .status(StatusCodes.OK)
        .send(await generateRmsDeviceId(option, imeiNo as string));
    } catch (error) {
      next(error);
    }
  }
);

route.post(
  "/update-order-details",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderId, count } = req.query as any;
      res
        .status(StatusCodes.OK)
        .send(await updateOrderDetails(orderId, +count));
    } catch (error) {
      next(error);
    }
  }
);

export default route;
