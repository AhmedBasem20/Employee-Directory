import { Container, Typography, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <Container sx={{ mt: 10, textAlign: "center" }}>
      <Typography variant="h4">Welcome to the Dashboard</Typography>
      <Button variant="contained" sx={{ mt: 2 }} onClick={logout}>
        Logout
      </Button>
    </Container>
  );
};

export default Dashboard;
