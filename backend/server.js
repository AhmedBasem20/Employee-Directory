require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const employeeRoutes = require("./routes/employeeRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173"
  })
);
app.use(express.json());

// Routes
app.use("/api/employees", employeeRoutes);
app.use("/api/auth", authRoutes);
app.get("/test", (req, res) => res.send("Test OK"));

// Start Server
sequelize.sync().then(() => {
  console.log("Database connected ✅");
  app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
});
