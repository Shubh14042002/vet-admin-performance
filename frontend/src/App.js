import React from "react";
import PatientList from "./PatientList";
import AddPatientForm from "./AddPatientForm";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Veterinary Admin Dashboard</h1>
      <AddPatientForm />
      <hr />
      <PatientList />
    </div>
  );
}

export default App;