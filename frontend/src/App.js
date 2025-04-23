import React, { useState, useEffect } from "react";
import axios from "axios";
import PatientList from "./PatientList";
import AddPatientForm from "./AddPatientForm";

function App() {
  const [patients, setPatients] = useState([]);

  const fetchPatients = () => {
    axios
      .get("http://52.45.170.117:3001/patients")
      .then((response) => setPatients(response.data))
      .catch((error) => console.error("Error fetching patients:", error));
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Veterinary Admin Dashboard</h1>
      <AddPatientForm onPatientAdded={fetchPatients} />
      <hr />
      <PatientList patients={patients} onDeleteSuccess={fetchPatients} />
    </div>
  );
}

export default App;