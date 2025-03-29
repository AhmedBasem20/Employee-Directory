import { useEffect, useState } from "react";
import { getEmployees, createEmployee } from "../services/employees";
import EmployeeCard from "../components/EmployeeCard";
import EmployeeFormDialog from "../components/EmployeeFormDialog";
import { TextField, Button } from "@mui/material";
import { Employee } from "../types";

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [addOpen, setAddOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchEmployees = async () => {
    const data = await getEmployees();
    setEmployees(data);
    setFilteredEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddEmployee = async (newEmployee: Employee) => {
    await createEmployee(newEmployee);
    fetchEmployees();
    setAddOpen(false);
  };

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    setFilteredEmployees(
      employees.filter(
        (emp) =>
          emp.fullName.toLowerCase().includes(lowerCaseQuery) ||
          emp.department.toLowerCase().includes(lowerCaseQuery)
      )
    );
  }, [searchQuery, employees]);

  return (
    <div>
      <TextField
        label="Search by Name or Department"
        variant="outlined"
        fullWidth
        sx={{ mb: 2, backgroundColor:'white' }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Button variant="contained" sx={{ mb: 2 }} onClick={() => setAddOpen(true)}>Add Employee</Button>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee) => (
            <EmployeeCard key={employee.id} {...employee} onEmployeeUpdate={fetchEmployees} />
          ))
        ) : (
          <p>No employees found.</p>
        )}
      </div>

      <EmployeeFormDialog open={addOpen} onClose={() => setAddOpen(false)} onSubmit={handleAddEmployee} />
    </div>
  );
};

export default EmployeeList;
