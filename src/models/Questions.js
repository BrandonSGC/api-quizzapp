import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Questions = sequelize.define(
  "Questions",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quiz_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "Questions",
  }
);

export default Questions;
