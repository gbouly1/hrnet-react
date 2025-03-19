import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import { useEmployees } from "../context/EmployeeContext";
import states from "../states";

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

  // Options pour le département
  const departments = [
    "Sales",
    "Marketing",
    "Engineering",
    "Human Resources",
    "Legal",
  ];

  const [lastEmployee, setLastEmployee] = useState({
    firstName: "",
    lastName: "",
  });

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

    // Stocker le nom et prénom de l'employé ajouté
    setLastEmployee({ firstName, lastName });

    // Ajouter l'employé via le contexte
    addEmployee(employee);

    // Afficher la modale de confirmation avec le nom et prénom
    setShowModal(true);

    // Réinitialiser le formulaire après avoir affiché la modale
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

  // Fonction pour fermer la modale
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold">HRNet</h1>
        <Link
          to="/employee-list"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          View Current Employees
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-6">Create Employee</h2>

        <form onSubmit={handleSubmit} className="max-w-lg">
          {/* Informations personnelles */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1" for="firstname">
                  First Name
                </label>
                <input
                  id="firstname"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block mb-1" for="lastname">
                  Last Name
                </label>
                <input
                  id="lastname"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block mb-1" for="birthdate">
                  Date of Birth
                </label>
                <input
                  id="birthdate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block mb-1" for="startdate">
                  Start Date
                </label>
                <input
                  id="startdate"
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
                <label className="block mb-1" for="address">
                  Street
                </label>
                <input
                  id="address"
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block mb-1" for="city">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block mb-1" for="state">
                  State
                </label>
                <select
                  id="state"
                  aria-label="state"
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
                <label className="block mb-1" for="zipcode">
                  Zip Code
                </label>
                <input
                  id="zipcode"
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
            <label className="block mb-1" for="department">
              Department
            </label>
            <select
              id="department"
              aria-label="department"
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
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded font-medium w-full"
          >
            Save
          </button>
        </form>
      </div>

      {/* Utilisation du composant Modal avec le nom de l'employé */}
      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title="Success!"
        message={`Employee ${lastEmployee.firstName} ${lastEmployee.lastName} created successfully.`}
      />
    </div>
  );
}

export default CreateEmployee;
