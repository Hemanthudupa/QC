import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { getAllOrderDetails, registerOrder } from "./module";
import { ensureEmbed } from "../utils/authentication";
const route = Router();

route.get(
  "/get-all-order-details",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { options } = req.query;
      res
        .status(StatusCodes.OK)
        .send(await getAllOrderDetails(options as string));
    } catch (error) {
      next(error);
    }
  }
);

route.use(ensureEmbed);

route.post(
  "/register-order",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderData = req.body as any;
      res.status(StatusCodes.OK).send(await registerOrder(orderData));
    } catch (error) {
      next(error);
    }
  }
);

export default route;
