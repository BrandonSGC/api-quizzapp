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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "Quizzes",
  }
);

export default Users;