import { createContext, useContext, useEffect, useState } from "react";

// Création du contexte
const EmployeeContext = createContext();

// Provider qui va envelopper votre application
export function EmployeeProvider({ children }) {
  // État local pour stocker les employés
  const [employees, setEmployees] = useState(() => {
    // Récupération des données depuis localStorage au chargement
    const savedEmployees = localStorage.getItem("employees");
    return savedEmployees ? JSON.parse(savedEmployees) : [];
  });

  // Sauvegarde dans localStorage à chaque modification de l'état
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  // Fonction pour ajouter un nouvel employé
  const addEmployee = (employee) => {
    setEmployees([...employees, employee]);
  };

  // Fonction pour supprimer un employé (si besoin)
  const deleteEmployee = (employeeId) => {
    setEmployees(employees.filter((employee) => employee.id !== employeeId));
  };

  // Regroupement des valeurs et fonctions à partager
  const value = {
    employees,
    addEmployee,
    deleteEmployee,
  };

  // Retour du Provider avec les valeurs
  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
}

// Hook personnalisé pour utiliser facilement le contexte
export function useEmployees() {
  return useContext(EmployeeContext);
}
