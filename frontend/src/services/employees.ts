import axios from "axios";

const API_URL = "http://localhost:3307/api/employees";

export const getEmployees = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch employees");
  }
};

export const createEmployee = async (employeeData: any) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(API_URL, employeeData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw new Error("Failed to create employee");
  }
};

export const updateEmployee = async (id: number, employeeData: any) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(`${API_URL}/${id}`, employeeData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw new Error("Failed to update employee");
  }
};

export const deleteEmployee = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw new Error("Failed to delete employee");
  }
};
