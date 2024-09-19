import { Op } from "sequelize";
import { login } from "../types";
import APIError from "../utils/api-error";
import { generateJwtToken, hashPassword } from "../utils/authentication";
import { User } from "./model";
import { compare } from "bcryptjs";
import csv from "csvtojson";

export async function login(loginData: login) {
  try {
    const user = await User.findOne({
      where: { username: loginData.username },
    });
    if (!user) {
      throw new APIError("user doesnot exist", "USER DOESNOT EXIST");
    }
    if (user.isActive === false) {
      throw new APIError("Not active user", "UNAUTHORIZED", 401);
    }
    const res = await compare(loginData.passward, user.password);
    if (res) {
      const tokenBody: any = {
        username: user.username,
        role: user.userRole,
        id: user.id,
      };
      if (user.userRole == "EMBED") {
        tokenBody.name = "EMBED";
      } else if (user.userRole == "QC") {
        tokenBody.name = "QC";
      } else if (user.userRole == "CONTROLLER") {
        tokenBody.name = "CONTROLLER";
      } else {
        tokenBody.name = "MOTOR";
      }
      return await generateJwtToken(tokenBody);
    } else {
      throw new APIError("invalid passward", "INVALID PASSWARD");
    }
  } catch (error) {
    throw new APIError((error as APIError).message, (error as APIError).code);
  }
}

export async function createSeedUsers() {
  try {
    const csvData = await csv().fromFile(
      process.env.APPLICATION_USERS_FILE_PATH!
    );

    for (let userData of csvData) {
      let userFromDb = await User.findOne({
        where: {
          username: userData.username,
        },
      });
      if (!userFromDb) {
        userData.password = hashPassword(userData.password);
        const createdUser = await User.create(userData);
        console.log(createdUser.username, " got created successfully ");
      }
    }
    return;
  } catch (error) {
    throw new APIError((error as APIError).message, (error as APIError).code);
  }
}
