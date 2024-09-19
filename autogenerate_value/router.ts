import { NextFunction, Request, Response, Router } from "express";
import { STATUS_CODES } from "http";
import { StatusCodes } from "http-status-codes";
import { autogenerate, getDistributor, registerHP } from "./module";
const route = Router();

route.post(
  "/register-hp",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body as any;
      res.status(StatusCodes.OK).send(await registerHP(data));
    } catch (error) {
      next(error);
    }
  }
);

route.get(
  "/autogenerate",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { motorHp, headSize, motorCategory, options } = req.query as any;

      res
        .status(StatusCodes.OK)
        .send(await autogenerate(motorHp, headSize, motorCategory, options));
    } catch (error) {
      next(error);
    }
  }
);

route.get(
  "/distributor",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 1, pageSize = 10, search = "" } = req.query as any;

      res
        .status(StatusCodes.OK)
        .send(await getDistributor(Number(page), Number(pageSize), search));
    } catch (err) {
      next(err);
    }
  }
);

export default route;
