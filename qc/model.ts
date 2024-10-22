import {
  CreationOptional,
  DATE,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  STRING,
  UUID,
  UUIDV4,
} from "sequelize";
import Distributor from "../distributor/model";
import sequelize from "../database";
import { MOTOR_HP, SIM_OPERATORS } from "../utils/constants";
import { INTEGER } from "sequelize";
import { DOUBLE } from "sequelize";
import { string } from "joi";
import { BOOLEAN } from "sequelize";
import { Order } from "../order/model";

export class QC extends Model<
  InferAttributes<QC>,
  InferCreationAttributes<QC>
> {
  declare id: CreationOptional<string>;
  declare imeiNo: CreationOptional<string | null>;
  declare distributorId: CreationOptional<ForeignKey<Distributor>>;
  declare orderId: CreationOptional<string>;
  declare simPhoneNumber: CreationOptional<string>;
  declare simNumber: CreationOptional<string>;
  declare simOperator: CreationOptional<string>;
  declare controllerRequirement: CreationOptional<boolean>;
  declare headSize: CreationOptional<string>;
  declare controllerBoxType: CreationOptional<string>;
  declare rmsRequirement: CreationOptional<boolean>;
  declare state: CreationOptional<string>;
  declare controllerBoxColor: CreationOptional<string>;
  declare pumpType: CreationOptional<string>;
  declare motorSerialNumber: CreationOptional<string>;
  declare motorHp: CreationOptional<string>;
  declare motorType: CreationOptional<string>;
  declare modelNumber: CreationOptional<string>;
  declare nodalAgency: CreationOptional<string>;
  declare motorSize: CreationOptional<string>;
  declare controllerSerialNumber: CreationOptional<string>;
  declare rmsDeviceId: CreationOptional<string>;
  declare motorCategory: CreationOptional<string>;
  declare isUpdated: CreationOptional<boolean>;
  declare networkType: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare product_set: CreationOptional<string>;
  declare updatedAt: CreationOptional<Date>;
}

const qc_Schema = {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  imeiNo: {
    type: STRING,
  },
  distributorId: {
    type: STRING,
    references: {
      model: Distributor,
      as: "distributorId",
    },
  },
  orderId: {
    type: UUID,
    references: {
      model: Order,
      as: "orderId",
    },
  },
  simPhoneNumber: {
    type: STRING,
  },
  simNumber: {
    type: STRING,
  },
  simOperator: {
    type: STRING,
    valiate: {
      isIn: [SIM_OPERATORS],
    },
  },
  controllerRequirement: {
    type: BOOLEAN,
  },
  headSize: {
    type: INTEGER,
  },
  controllerBoxType: {
    type: STRING,
  },
  rmsRequirement: {
    type: BOOLEAN,
  },
  state: {
    type: STRING,
  },
  controllerBoxColor: {
    type: STRING,
  },
  pumpType: {
    type: STRING,
  },
  motorSerialNumber: {
    type: STRING,
  },
  motorHp: {
    type: DOUBLE,
    validate: {
      isIn: [MOTOR_HP],
    },
  },
  motorType: {
    type: STRING,
  },
  modelNumber: {
    type: STRING,
  },
  nodalAgency: {
    type: STRING,
  },
  motorSize: {
    type: STRING,
  },
  controllerSerialNumber: {
    type: STRING,
  },
  rmsDeviceId: {
    type: STRING,
  },
  motorCategory: {
    type: STRING,
  },
  networkType: {
    type: STRING,
  },
  isUpdated: {
    type: BOOLEAN,
    defaultValue: false,
  },
  product_set: {
    type: STRING,
  },
  createdAt: {
    type: DATE,
  },
  updatedAt: {
    type: DATE,
  },
};

QC.init(qc_Schema, { sequelize, tableName: "qc", modelName: "QC" });

QC.belongsTo(Distributor, {
  foreignKey: "distributorId", // Foreign key in QC table
  targetKey: "id", // Primary key in Distributor table
  as: "distributor", // Alias for the relationship
});

QC.belongsTo(Order, {
  foreignKey: "orderId",
  targetKey: "id",
  as: "order",
});
