import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  STRING,
} from "sequelize";
import { INTEGER } from "sequelize";
import { DOUBLE } from "sequelize";
import { DATE } from "sequelize";
import { CreationOptional, Model, UUID } from "sequelize";
import { MOTOR_CATEGORY, MOTOR_HP } from "../utils/constants";
import sequelize from "../database";

export class Autogenerate_Value extends Model<
  InferAttributes<Autogenerate_Value>,
  InferCreationAttributes<Autogenerate_Value>
> {
  declare id: CreationOptional<string>;
  declare motorSerialNumber: CreationOptional<string>;
  declare motorHp: CreationOptional<number>;
  declare modelNumber: CreationOptional<string>;
  declare controllerSerialNumber: CreationOptional<string>;
  declare rmsDeviceId: CreationOptional<string>;
  declare headSize: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare motorCategory: CreationOptional<string>;
}
const autogenerate_Value_Schema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  motorSerialNumber: {
    type: STRING,
    unique: true,
  },
  motorHp: {
    type: DOUBLE,
    validate: {
      isIn: [MOTOR_HP],
    },
  },
  modelNumber: {
    type: STRING,
    unique: true,
  },
  controllerSerialNumber: {
    type: STRING,
    unique: true,
  },
  rmsDeviceId: {
    type: STRING,
    unique: true,
  },
  headSize: {
    type: INTEGER,
  },

  createdAt: {
    type: DATE,
    defaultValues: sequelize.fn("NOW"),
  },
  updatedAt: {
    type: DATE,
    defaultValues: sequelize.fn("NOW"),
  },
  motorCategory: {
    type: STRING,
    validate: {
      isIn: [Object.values(MOTOR_CATEGORY)],
    },
  },
};

Autogenerate_Value.init(autogenerate_Value_Schema, {
  sequelize,
  modelName: "autogenerate_value",
  tableName: "autogenerate_value",
  timestamps: true,
});
