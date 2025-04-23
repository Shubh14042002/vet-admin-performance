import React from "react";
import axios from "axios";

const PatientList = ({ patients, onDeleteSuccess }) => {
  const handleDelete = (id) => {
    axios
      .delete(`http://52.45.170.117:3001/patients/${id}`)
      .then(() => {
        onDeleteSuccess(); // Re-fetch after deletion
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