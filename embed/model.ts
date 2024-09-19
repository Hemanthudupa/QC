import {
  CreationOptional,
  DATE,
  InferAttributes,
  InferCreationAttributes,
  Model,
  STRING,
  UUID,
  UUIDV4,
} from "sequelize";
import Distributor from "../distributor/model";
import sequelize from "../database";

export class Embed extends Model<
  InferAttributes<Embed>,
  InferCreationAttributes<Embed>
> {
  declare id: CreationOptional<string>;
  declare distributorId: CreationOptional<string>;
  declare imeiNo: CreationOptional<string>;
  declare simPhoneNumber: CreationOptional<string>;
  declare simNumber: CreationOptional<string>;
  declare simOperator: CreationOptional<string>;
  declare networkType: CreationOptional<string>;
  declare rmsDeviceId: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

const embedSchema = {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  distributorId: {
    type: UUID,
    references: {
      model: Distributor,
      as: "distributorId",
    },
  },
  imeiNo: {
    type: STRING,
  },
  simPhoneNumber: {
    type: STRING,
  },
  simNumber: {
    type: STRING,
  },
  simOperator: {
    type: STRING,
  },
  rmsDeviceId: {
    type: STRING,
  },
  networkType: {
    type: STRING,
  },
  createdAt: {
    type: DATE,
  },
  updatedAt: {
    type: DATE,
  },
};

Embed.init(embedSchema, {
  sequelize,
  modelName: "qc",
  tableName: "qc",
  timestamps: true,
});
