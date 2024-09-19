import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { login } from "./module";
const route = Router();
route.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginRequestBody = req.body as any;
      res.status(StatusCodes.OK).send(await login(loginRequestBody));
    } catch (error) {
      next(error);
    }
  }
);

export default route;
