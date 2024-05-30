import Sequelize from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

// export const sequelize = new Sequelize("QuizzApp", "postgres", "root", {
//   host: "localhost",
//   dialect: "postgres",
//   logging: false, // Disables logging
// });

export const sequelize = new Sequelize(process.env.DATABASE_URL);
