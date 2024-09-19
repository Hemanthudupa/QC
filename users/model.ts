/* eslint-disable no-use-before-define */
import {
  UUID,
  UUIDV4,
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../database";

import { USER_ROLES } from "../utils/constants";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<string>;

  declare username: string;

  declare password: string;

  declare email: CreationOptional<string>;

  declare userRole: string;

  declare isActive: boolean;

  declare createdAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;
}

const userSchema = {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    validate: { isEmail: true },
    unique: true,
  },
  userRole: {
    type: DataTypes.STRING,
    validate: { isIn: [USER_ROLES] },
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
};

User.init(userSchema, {
  sequelize: sequelize, // Make sure to include this line
  modelName: "users",

  timestamps: true,
  // ... other options
});
