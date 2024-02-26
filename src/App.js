import React, { useState, useEffect } from "react";
import "./App.css"; // Import the CSS file

const EmployeePagination = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = () => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setEmployees(data);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        // Display an alert message
        alert("Failed to fetch data. Please try again.");
      });
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(employees.length / perPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, employees.length);

  return (
    <div>
      <h1>Employee Data Table</h1>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.slice(startIndex, endIndex).map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-container">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          type="button"
          class="btn btn-outline-primary"
        >
          Previous
        </button>
        <button
          type="button"
          class="btn btn-outline-primary"
          disabled={currentPage} // Disable if on the first page
        >
          {" "}
          {currentPage}
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage * perPage >= employees.length}
          type="button"
          class="btn btn-outline-primary"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeePagination;
