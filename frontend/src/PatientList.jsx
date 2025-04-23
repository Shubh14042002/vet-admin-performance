import React, { useEffect, useState } from "react";
import axios from "axios";

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Fetch patients from the backend
    axios.get("http://52.45.170.117:3001/patients")
      .then((response) => setPatients(response.data))
      .catch((error) => console.error("Error fetching patients:", error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://52.45.170.117:3001/patients/${id}`)
      .then(() => {
        setPatients(patients.filter((patient) => patient.id !== id));
      })
      .catch((error) => console.error("Error deleting patient:", error));
  };
  return (
    <div>
      <h2>Patient List</h2>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Species</th>
            <th>Owner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.species}</td>
              <td>{patient.owner}</td>
              <td>
                <button onClick={() => handleDelete(patient.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );  
};

export default PatientList;