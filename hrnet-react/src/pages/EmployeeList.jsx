import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { useEmployees } from "../context/EmployeeContext";

const EmployeeList = () => {
  const { employees } = useEmployees(); // Utilisation de notre hook personnalisé
  const [searchTerm, setSearchTerm] = useState("");

  // Styles personnalisés pour le tableau
  const customStyles = {
    table: {
      style: {
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        borderRadius: "10px",
        overflow: "hidden",
      },
    },
    rows: {
      style: {
        backgroundColor: "#f9f9f9",
        color: "#808080",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#f9f9f9",
        color: "#808080",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        borderBottom: "1px solid #ddd",
      },
    },
  };

  // Filtrage des employés en fonction du terme de recherche
  const filteredEmployees = employees.filter((employee) => {
    return (
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.address.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.address.zipCode
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      employee.address.street.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Colonnes pour la DataTable
  const columns = [
    { name: "First Name", selector: (row) => row.firstName, sortable: true },
    { name: "Last Name", selector: (row) => row.lastName, sortable: true },
    { name: "Start Date", selector: (row) => row.startDate, sortable: true },
    { name: "Department", selector: (row) => row.department, sortable: true },
    { name: "Date of Birth", selector: (row) => row.birthDate, sortable: true },
    { name: "Street", selector: (row) => row.address.street, sortable: true },
    { name: "City", selector: (row) => row.address.city, sortable: true },
    { name: "State", selector: (row) => row.address.state, sortable: true },
    {
      name: "Zip Code",
      selector: (row) => row.address.zipCode,
      sortable: true,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">HRNet</h1>
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Create Employee
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Current Employees</h2>
          <input
            type="text"
            placeholder="Search employees..."
            className="p-2 border rounded w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {employees.length === 0 ? (
          <p className="text-gray-500">
            No employees found. Add some employees to see them here.
          </p>
        ) : (
          <DataTable
            columns={columns}
            data={filteredEmployees}
            customStyles={customStyles}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 20, 50, 100]}
            defaultSortFieldId={1}
            sortServer={false}
            noDataComponent="No employees found matching your search criteria"
          />
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
