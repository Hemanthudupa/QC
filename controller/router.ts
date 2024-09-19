import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { downloadControllerDeviceDetails } from "./module";
import { ensureController } from "../utils/authentication";
let route = Router();
route.use(ensureController);
route.get(
  "/download-controller-device-details/:orderId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderId } = (req as any).params;

      const { startDate, endDate } = req.query as any;
      res
        .status(StatusCodes.OK)
        .send(
          await downloadControllerDeviceDetails(startDate, endDate, orderId)
        );
    } catch (error) {
      next(error);
    }
  }
);
export default route;
