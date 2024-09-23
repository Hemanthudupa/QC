import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { downloadMotorDeviceDetails } from "./module";
import { ensureMotor } from "../utils/authentication";
let routes = Router();
routes.use(ensureMotor);
routes.get(
  "/download-motor-device-details",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { startDate, endDate, orderId } = req.query as any;
      res
        .status(StatusCodes.OK)
        .send(await downloadMotorDeviceDetails(startDate, endDate, orderId));
    } catch (error) {
      next(error);
    }
  }
);
export default routes;
