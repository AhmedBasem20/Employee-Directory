import { Container, Typography, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import EmployeeList from "../components/EmployeeList";

const Dashboard = () => {
    const { logout } = useAuth();

    return (
        <Container sx={{ mt: 10, textAlign: "center" }}>
            <Button
                variant="outlined"
                sx={{ mt: 2, position: 'absolute', top: 20, right: 20 }}
                onClick={logout}>
                Logout
            </Button>
            <EmployeeList />
        </Container>
    );
};

export default Dashboard;
