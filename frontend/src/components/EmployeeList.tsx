import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getEmployees, createEmployee } from "../services/employees";
import { Employee } from "../types";
import EmployeeCard from "../components/EmployeeCard";
import EmployeeFormDialog from "./EmployeeFormDialog";

const EmployeeList = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [addOpen, setAddOpen] = useState(false);
  
    const fetchEmployees = async () => {
      const data = await getEmployees();
      setEmployees(data);
    };
  
    useEffect(() => {
      fetchEmployees();
    }, []);
  
    const handleAddEmployee = async (newEmployee: Employee) => {
      await createEmployee(newEmployee);
      fetchEmployees();
      setAddOpen(false);
    };
  
    return (
        <div>
          <Button variant="contained" sx={{ mb: 2 }} onClick={() => setAddOpen(true)}>Add Employee</Button>
          
          <div style={{ display: "flex", gap: "16px", alignContent:'center', flexWrap: "wrap" }}>
            {employees.map((employee) => (
              <EmployeeCard key={employee.id} {...employee} onEmployeeUpdate={fetchEmployees} />
            ))}
          </div>
    
          <EmployeeFormDialog open={addOpen} onClose={() => setAddOpen(false)} onSubmit={handleAddEmployee} />
        </div>
      );
  };
export default EmployeeList;
