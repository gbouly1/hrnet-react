import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEmployees } from "../context/EmployeeContext";

function CreateEmployee() {
  // États pour le formulaire
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [department, setDepartment] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  // État pour contrôler l'affichage de la modale
  const [showModal, setShowModal] = useState(false);

  // Accès au contexte pour ajouter un employé
  const { addEmployee } = useEmployees();

  // Options pour le sélecteur d'état
  const states = [
    { value: "AL", name: "Alabama" },
    { value: "AK", name: "Alaska" },
    { value: "AZ", name: "Arizona" },
    { value: "AR", name: "Arkansas" },
    { value: "CA", name: "California" },
    // Ajoutez les autres états américains ici
  ];

  // Options pour le département
  const departments = [
    "Sales",
    "Marketing",
    "Engineering",
    "Human Resources",
    "Legal",
  ];

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Créer un nouvel employé
    const employee = {
      id: Date.now(),
      firstName,
      lastName,
      birthDate,
      startDate,
      department,
      address: {
        street,
        city,
        state,
        zipCode,
      },
    };

    // Ajouter l'employé via le contexte
    addEmployee(employee);

    // Afficher la modale de confirmation
    setShowModal(true);

    // Réinitialiser le formulaire
    resetForm();
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setBirthDate("");
    setStartDate("");
    setDepartment("");
    setStreet("");
    setCity("");
    setState("");
    setZipCode("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">HRNet</h1>
        <Link
          to="/employee-list"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          View Current Employees
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6">Create Employee</h2>

        <form onSubmit={handleSubmit} className="max-w-lg">
          {/* Informations personnelles */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
          </div>

          {/* Adresse */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Address</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-1">Street</label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block mb-1">State</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state.value} value={state.value}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1">Zip Code</label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
          </div>

          {/* Département */}
          <div className="mb-6">
            <label className="block mb-1">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded font-medium"
          >
            Save
          </button>
        </form>
      </div>

      {/* Ici vous ajouterez votre composant Modal quand vous l'aurez créé */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h2 className="text-xl font-semibold mb-4">Success!</h2>
            <p>Employee created successfully.</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateEmployee;
