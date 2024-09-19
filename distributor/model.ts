import {
  UUID,
  Model,
  STRING,
  TEXT,
  UUIDV4,
  DATE,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";

import { User } from "../users/model";
import sequelize from "../database";
import { QC } from "../qc/model";

const distributorSchema = {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: UUID,
    references: {
      model: User,
      key: "id",
    },
  },
  firstName: {
    type: STRING,
    allowNull: false,
  },
  lastName: {
    type: STRING,
  },
  mobileNumber: {
    type: STRING,
  },
  address: {
    type: TEXT,
  },
  state: {
    type: STRING,
  },
  district: {
    type: STRING,
  },
  taluk: {
    type: STRING,
  },
  businessName: {
    type: STRING,
  },
  businessGST: {
    type: STRING,
  },
  createdAt: {
    type: DATE,
  },
  updatedAt: {
    type: DATE,
  },
};

class Distributor extends Model<
  InferAttributes<Distributor>,
  InferCreationAttributes<Distributor>
> {
  declare id: CreationOptional<string>;

  declare userId: ForeignKey<User["id"]>;

  declare firstName: string;

  declare lastName: CreationOptional<string>;

  declare mobileNumber: string;

  declare address: CreationOptional<string>;

  declare state: CreationOptional<string>;

  declare district: CreationOptional<string>;

  declare taluk: CreationOptional<string>;

  declare businessName: string;

  declare businessGST: string;

  declare createdAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;
}

Distributor.init(distributorSchema, {
  sequelize,
  modelName: "distributor",
  tableName: "distributor",
  timestamps: true,
});

Distributor.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// Distributor.hasMany(Consumer, {
//   foreignKey: "distributorId",
//   as: "consumer",
// });

export default Distributor;
