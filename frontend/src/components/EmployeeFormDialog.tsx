import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { Employee } from "../types";

interface EmployeeFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (employeeData: Employee) => void;
  initialData?: Employee | null;
}

const EmployeeFormDialog: React.FC<EmployeeFormDialogProps> = ({ open, onClose, onSubmit, initialData }) => {
  const [employee, setEmployee] = useState<Employee>({
    id: 0,
    fullName: "",
    department: "",
    email: "",
    jobTitle: "",
    status: "Active",
    profileImage: "",
  });

  useEffect(() => {
    if (initialData) setEmployee(initialData);
    else setEmployee({  fullName: "", department: "", email: "", jobTitle: "", status: "Active", profileImage: "" });
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(employee);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? "Edit Employee" : "Add Employee"}</DialogTitle>
      <DialogContent>
        <TextField fullWidth name="fullName" label="Full Name" value={employee.fullName} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth name="department" label="Department" value={employee.department} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth name="email" label="Email" value={employee.email} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth name="jobTitle" label="Job Title" value={employee.jobTitle} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth name="status" label="Status" value={employee.status} onChange={handleChange} />
        <TextField fullWidth name="phoneNumber" label="Phone" value={employee.phoneNumber} onChange={handleChange} sx={{ mb: 2 }} />

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">{initialData ? "Save Changes" : "Add Employee"}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeFormDialog;
