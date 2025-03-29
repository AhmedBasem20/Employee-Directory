import { Card, CardContent, Typography, Avatar, Box, Chip, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { deleteEmployee, updateEmployee } from "../services/employees";
import EmployeeFormDialog from "./EmployeeFormDialog";
import { Employee } from "../types";

interface EmployeeCardProps extends Employee {
  onEmployeeUpdate: () => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = (props) => {
  const { id, fullName, department, email, jobTitle, status, profileImage, onEmployeeUpdate } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleEditSubmit = async (updatedEmployee: Employee) => {
    await updateEmployee(id, updatedEmployee);
    onEmployeeUpdate();
    setEditOpen(false);
  };

  const handleDelete = async () => {
    await deleteEmployee(id);
    onEmployeeUpdate();
    setDeleteOpen(false);
  };

  return (
    <Card sx={{ width: "100%", maxWidth: 300, p: 2, borderRadius: 3, boxShadow: 3, position: "relative" }}>

      <IconButton sx={{ position: "absolute", top: 8, right: 8 }} onClick={handleMenuClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => { setEditOpen(true); handleMenuClose(); }}>Edit</MenuItem>
        <MenuItem onClick={() => { setDeleteOpen(true); handleMenuClose(); }} sx={{ color: "error.main" }}>Delete</MenuItem>
      </Menu>


      <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
        <Avatar src={profileImage || "/default-profile.png"} alt={fullName} sx={{ width: 64, height: 64 }} />
        <Box>
          <Typography variant="h6" fontWeight="bold">{fullName}</Typography>
          <Typography variant="body2" color="text.secondary">{jobTitle}</Typography>
        </Box>
      </Box>

      <CardContent>
        <Typography variant="body2" sx={{ mb: 1 }}><strong>Department:</strong> {department}</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}><strong>Email:</strong> {email}</Typography>
        <Box mt={1}>
          <Chip label={status} color={status === "Active" ? "success" : "error"} variant="outlined" />
        </Box>
      </CardContent>


      <EmployeeFormDialog open={editOpen} onClose={() => setEditOpen(false)} onSubmit={handleEditSubmit} initialData={props} />


      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent><Typography>Are you sure you want to delete {fullName}?</Typography></DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default EmployeeCard;
