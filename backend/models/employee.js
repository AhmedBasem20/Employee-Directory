const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Employee = sequelize.define("Employee", {
  fullName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  department: { type: DataTypes.STRING, allowNull: false },
  jobTitle: { type: DataTypes.STRING, allowNull: false },
  phoneNumber: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.ENUM("Active", "Inactive"), defaultValue: "Active" },
});

module.exports = Employee;
