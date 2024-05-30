import { app } from "./app.js";
import dotenv from "dotenv";
import { sequelize } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

async function main() {
  try {
    testConnection();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server running on port: http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error(error);
  }
}

main();
