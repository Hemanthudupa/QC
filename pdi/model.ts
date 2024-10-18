import {
  CreationOptional,
  DATE,
  InferAttributes,
  InferCreationAttributes,
  Model,
  STRING,
  UUID,
  UUIDV4,
  NUMBER
} from "sequelize";
import sequelize from "../database";


export class Pdi extends Model<
  InferAttributes<Pdi>,
  InferCreationAttributes<Pdi>
> {
  declare id: CreationOptional<string>;
  declare pdi_Name :CreationOptional<string>
  declare motor_hp: string;
  declare head_size: string;
  declare motor_category: string;
  declare controller_box_type: string;
  declare orderCount: number;
  declare orderId: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

const pdiSchema = {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  pdi_Name: {
    type: STRING,
    allowNull: false,
    
  },
  motor_hp: {
    type: STRING,
    allowNull: false,
  },
  head_size: {
    type: STRING,
    allowNull: false,
  },
  motor_category: {
    type: STRING,
    allowNull: false,
  },
  controller_box_type: {
    type: STRING,
    allowNull: false,
  },
  orderCount: {
    type: NUMBER,
    allowNull: false,
  },
  orderId: {
    type: UUID,
    allowNull: false,
    references: {
      model: "order", // Name of the referenced table
      key: "id",
    },
    onDelete: "CASCADE", // Deletes related PDI entries when the order is deleted
    onUpdate: "CASCADE", // Updates related PDI entries if the orderId is updated
  },
  createdAt: {
    type: DATE,
  },
  updatedAt: {
    type: DATE,
  },
};

Pdi.init(pdiSchema, {
  sequelize,
  timestamps: true,
  tableName: "pdi",
});

export default Pdi;
