import express, { NextFunction, Request, Response } from "express";
import bodyparser from "body-parser";
import morgan from "morgan";
import autogenerateValue from "./autogenerate_value/router";
import APIError from "./utils/api-error";
import embed from "./embed/router";
import qc from "./qc/router";
import order from "./order/router";
import user from "./users/router";
import { authorizeUser } from "./utils/authentication";
import cors from "cors";
import motor from "./motor/router";
import controller from "./controller/router";
import pdi from "./pdi/router";

let app = express();
app.use(morgan("common"));
app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/user", user);
app.use(authorizeUser);
app.use("/autogenerateValue", autogenerateValue);
app.use("/qc", qc);
app.use("/embed", embed);
app.use("/pdi", pdi);
app.use("/order", order);
app.use("/motor", motor);
app.use("/controller", controller);

app.use(errorHandler);

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof APIError) {
    res.status(err.statusCode).send({
      message: err.message,
      code: err.code,
    });
  } else {
    res.status(400).send({ message: err.message, code: "ERROR_CODE" });
  }
}
export default app;
