const express = require("express");
const { body, validationResult } = require("express-validator");
const Employee = require("../models/employee");
const auth = require("../middleware/auth");
const router = express.Router();

// Create Employee
router.post("/", auth, [
  body("fullName").notEmpty().withMessage("Full name is required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("department").notEmpty().withMessage("Department is required"),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/", auth, async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put("/:id", auth, async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    await employee.update(req.body);
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete("/:id", auth, async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    await employee.destroy();
    res.json({ message: "Employee deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
