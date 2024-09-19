import APIError from "./api-error";
import { sign, verify } from "jsonwebtoken";
import { config } from "dotenv";
import { join } from "path";
import { userType } from "../types";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../users/model";
config({
  path: join(__dirname, ".env", "local.env"),
});

import { hashSync } from "bcryptjs";
import { logError } from "./console";
import { USER_ROLES } from "./constants";

export async function generateJwtToken(user: userType) {
  try {
    const token = sign(user, process.env.JWT_KEY as string, {
      expiresIn: `${process.env.TOKEN_EXPIRY_IN_DAYS}d`,
    });
    return {
      token,
      role: user.role,
    };
  } catch (error) {
    throw new APIError((error as APIError).message, (error as APIError).code);
  }
}
export async function authorizeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let token = null;
    if (req.headers && req.headers.authorization) {
      if (req.headers.authorization.split(" ").length == 2) {
        token = req.headers.authorization.split(" ").pop() as string;
      }
    }

    if (token) {
      const data: any = verify(token, process.env.JWT_KEY as string);
      (req as any).user = {
        userId: data.userId,
        role: data.role,
        username: data.username,
        id: data.id || "",
      };
    } else {
      throw new APIError("UNAUTHORIZED", "UNAUTHORIZED");
    }
    next();
  } catch (error) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ message: (error as Error).message, code: "UNAUTHORIZED" });
    return;
  }
}

export function hashPassword(password: string) {
  try {
    return hashSync(password, 10);
  } catch (error) {
    logError(error);
    throw error;
  }
}

export async function ensureQC(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { role } = (req as any).user || {};
    if (role == "QC") {
      next();
      return;
    } else {
      res.status(StatusCodes.UNAUTHORIZED).send({
        message: " Only QC people can  perform this action ",
        code: "UNAUTHORIZED",
      });
    }
  } catch (error) {
    throw new APIError((error as APIError).message, (error as APIError).code);
  }
}

export async function ensureEmbed(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { role } = (req as any).user || {};
    if (role == "EMBED") {
      next();
      return;
    } else {
      res.status(StatusCodes.UNAUTHORIZED).send({
        message: " Only EMBED people can  perform this action ",
        code: "UNAUTHORIZED",
      });
    }
  } catch (error) {
    throw new APIError((error as APIError).message, (error as APIError).code);
  }
}

export async function ensureController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let { role } = (req as any).user;
    if (role == USER_ROLES[9]) {
      next();
      return;
    } else {
      res.status(400).send({
        message: "only controller people can perfrom this action ",
        code: "ONLY CONTROLLER PEOPLE CAN PERFROM THIS ACTION",
      });
    }
  } catch (error) {
    throw new APIError((error as APIError).message, (error as APIError).code);
  }
}

export async function ensureMotor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { role } = (req as any).user;
    if (role == USER_ROLES[10]) {
      next();
    } else {
      res.status(400).send({
        message: " only motor people can perform this action ",
        code: " ONLY MOTOR PEOPLE CAN PERFORM THIS ACTION ",
      });
    }
  } catch (error) {
    throw new APIError((error as APIError).message, (error as APIError).code);
  }
}
