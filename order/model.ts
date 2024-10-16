import {
  CreationOptional,
  DataTypes,
  DATE,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NUMBER,
  STRING,
  UUID,
  UUIDV4,
} from "sequelize";
import sequelize from "../database";
import { BOOLEAN } from "sequelize";
import { ORDER_STATUS, type } from "../utils/constants";

export class Order extends Model<
  InferAttributes<Order>,
  InferCreationAttributes<Order>
> {
  declare id: CreationOptional<string>;
  declare orderNumber: CreationOptional<string>;
  declare count: CreationOptional<number>;
  declare status: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare embedCount: CreationOptional<number>;
  declare type: CreationOptional<string>;
  declare qcCount: CreationOptional<number>;
}

const orderSchema = {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  orderNumber: {
    type: STRING,
    allowNull: false,
  },
  status: {
    type: STRING,
    isIn: [Object.values(ORDER_STATUS)],
  },
  count: {
    type: NUMBER,
  },
  embedCount: {
    type: NUMBER,
    defaultValue: 0,
  },
  qcCount: {
    type: NUMBER,
    defaultValue: 0,
  },
  type: {
    type: STRING,
    isIn: [Object.values(type)],
  },

  createdAt: {
    type: DATE,
  },
  updatedAt: {
    type: DATE,
  },
};

Order.init(orderSchema, {
  sequelize,
  timestamps: true,
  modelName: "Order",
  tableName: "order",
});
