import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import { Employee } from "./types/Employee";

const App: React.FC = () => {
  const API_URL = "https://localhost:44321/api/Employees";

  // --- State Management with Types ---
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  // --- 1. Load Data ---
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get<Employee[]>(API_URL);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // --- 2. Handlers for Modal ---
  const handleAddNew = () => {
    setCurrentEmployee(null); // Clear form for new entry
    setShowModal(true);       // Show Modal
  };

  const handleEdit = (employee: Employee) => {
    setCurrentEmployee(employee); // Populate form with existing data
    setShowModal(true);           // Show Modal
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentEmployee(null);
  };

  // --- 3. CRUD Operations ---
  const handleSave = async (employeeData: Employee) => {
    try {
      if (employeeData.id) {
        // UPDATE
        await axios.put(`${API_URL}/${employeeData.id}`, employeeData);
      } else {
        // CREATE
        await axios.post(API_URL, employeeData);
      }
      await fetchEmployees(); // Refresh List
      handleCloseModal();     // Close Modal
    } catch (error) {
      console.error("Error saving employee:", error);
      alert("Error saving data. Check console.");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        await fetchEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  return (
    <div className="container py-5">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary fw-bold">
          <i className="bi bi-people-fill me-2"></i>
          Employee Management
        </h2>
        <button
          className="btn btn-success btn-lg shadow-sm"
          onClick={handleAddNew}
        >
          <span className="fw-bold">+ Add New Employee</span>
        </button>
      </div>

      {/* Main List Section */}
      <EmployeeList
        employees={employees}
        onEdit={handleEdit}
        onDelete={handleDelete}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
      />

      {/* Modal Form */}
      <EmployeeForm
        show={showModal}
        handleClose={handleCloseModal}
        onSave={handleSave}
        currentEmployee={currentEmployee}
      />
    </div>
  );
};

export default App;