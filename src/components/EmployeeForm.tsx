import React, { useState, useEffect } from "react";
import { Employee } from "../types/Employee";

interface EmployeeFormProps {
  show: boolean;
  handleClose: () => void;
  onSave: (employee: Employee) => void;
  currentEmployee: Employee | null;
}

const initialData: Employee = {
  firstName: "",
  lastName: "",
  email: "",
  salary: 0,
};

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  show,
  handleClose,
  onSave,
  currentEmployee,
}) => {
  const [employee, setEmployee] = useState<Employee>(initialData);

  // Populate form if editing, otherwise reset
  useEffect(() => {
    if (currentEmployee) {
      setEmployee(currentEmployee);
    } else {
      setEmployee(initialData);
    }
  }, [currentEmployee, show]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(employee);
  };

  if (!show) return null;

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex={-1}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              {currentEmployee ? "Edit Employee" : "Add New Employee"}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} id="employeeForm">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={employee.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={employee.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={employee.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Salary</label>
                <div className="input-group">
                  <span className="input-group-text">₹</span>
                  <input
                    type="number"
                    className="form-control"
                    name="salary"
                    value={employee.salary}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              form="employeeForm"
              className="btn btn-primary"
            >
              {currentEmployee ? "Update Changes" : "Save Employee"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;