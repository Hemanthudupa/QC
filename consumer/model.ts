/* eslint-disable no-use-before-define */
import {
  CreationOptional,
  DATE,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  STRING,
  TEXT,
  UUID,
  UUIDV4,
} from "sequelize";
import { User } from "../users/model";
import Distributor from "../distributor/model";
import sequelize from "../database";

const consumerSchema = {
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
  aadhar: {
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
  distributorId: {
    type: UUID,
    references: {
      model: Distributor,
      key: "id",
    },
  },
  createdAt: {
    type: DATE,
  },
  updatedAt: {
    type: DATE,
  },
};

class Consumer extends Model<
  InferAttributes<Consumer>,
  InferCreationAttributes<Consumer>
> {
  declare id: CreationOptional<string>;

  declare userId: ForeignKey<User["id"]>;

  declare firstName: string;

  declare lastName: CreationOptional<string>;

  declare mobileNumber: string;

  declare aadhar: CreationOptional<string>;

  declare address: CreationOptional<string>;

  declare state: CreationOptional<string>;

  declare district: CreationOptional<string>;

  declare taluk: CreationOptional<string>;

  declare distributorId: ForeignKey<Distributor["id"]>;

  declare createdAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;
}

Consumer.init(consumerSchema, {
  sequelize,
  modelName: "consumer",
  tableName: "consumer",
  timestamps: true,
});

Consumer.belongsTo(Distributor, {
  foreignKey: "distributorId",
  as: "distributor",
});

Distributor.hasMany(Consumer, {
  foreignKey: "distributorId",
  as: "consumer",
});

User.hasMany(Consumer, {
  foreignKey: "userId",
  as: "user",
});

Consumer.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export default Consumer;
