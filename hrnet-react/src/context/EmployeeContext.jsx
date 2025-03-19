import { createContext, useContext, useState } from "react";

// Création du contexte
const EmployeeContext = createContext();

// Provider qui va envelopper votre application
export function EmployeeProvider({ children }) {
  // État local pour stocker les employés (sans localStorage)
  const [employees, setEmployees] = useState([]);

  // Fonction pour ajouter un nouvel employé
  const addEmployee = (employee) => {
    setEmployees([...employees, employee]);
  };

  // Regroupement des valeurs et fonctions à partager
  const value = {
    employees,
    addEmployee,
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
