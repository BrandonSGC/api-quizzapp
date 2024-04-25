import { DataTypes } from "sequelize";
import { sequelize } from '../config/db.js'

const Quizzes = sequelize.define(
  "Quizzes",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "Quizzes",
  }
);

export default Quizzes;