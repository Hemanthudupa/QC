import app from "./app";
import { connectToDataBase } from "./database";
import { config } from "dotenv";
import { join } from "path";
import { createSeedUsers } from "./users/module";
config({
  path: join(__dirname, ".env", "local.env"),
});
connectToDataBase()
  .then((res) => {
    if (res) {
      console.log("successfully connected to database");
    }
    return createSeedUsers();
  })
  .then(() => {
    app.listen(process.env.port, () => {
      console.log(`server  is  running on port ${process.env.port}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
