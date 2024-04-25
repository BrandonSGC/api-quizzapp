import Sequelize from "sequelize";

export const sequelize = new Sequelize("QuizzApp", "postgres", "root", {
  host: "localhost",
  dialect: "postgres",
  logging: false, // Disables logging
});
