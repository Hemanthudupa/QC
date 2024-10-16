import { Sequelize } from "sequelize";
import { config } from "dotenv";
import { join } from "path";
config({
  path: join(__dirname, ".env", "local.env"),
});
import { SequelizeStorage, Umzug } from "umzug";

console.log(join(__dirname, ".env", "local.env"));
const db_name = process.env.SQL_DB_NAME || ("mecwindb" as string);
const db_user = process.env.SQL_DB_USER || ("postgres" as string);
const db_pass = process.env.SQL_DB_PWD || ("root" as string);

console.log(db_name, db_user, db_pass);
const sequelize = new Sequelize(db_name, db_user, db_pass, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});
export async function connectToDataBase() {
  try {
    await sequelize.authenticate();
    runAllMigrationFiles();
    return sequelize;
  } catch (error) {
    console.log("unable to connect to the database ", error);
  }
}

async function runAllMigrationFiles() {
  const umzug = new Umzug({
    migrations: {
      glob: [
        "./migrations/*.js",
        {
          cwd: __dirname,
        },
      ],
    },
    logger: undefined,
    storage: new SequelizeStorage({
      sequelize,
    }),
    context: sequelize,
  });
  const data = await umzug.up();
  console.log(" successfully all the migration files are excicuted ");
}

export default sequelize;
