import React, { useState } from "react";
import axios from "axios";

const AddPatientForm = ({ onPatientAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    species: "",
    owner: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://52.45.170.117:3001/patients", formData)
      .then(() => {
        alert("Patient added successfully!");
        setFormData({ name: "", age: "", species: "", owner: "" });
        onPatientAdded(); // Trigger re-fetch
      })
      .catch((error) => console.error("Error adding patient:", error));
  };

  return (
    <div>
      <h2>Add New Patient</h2>
      <form onSubmit={handleSubmit}>
        {/* input fields */}
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Age:
          <input type="number" name="age" value={formData.age} onChange={handleChange} min="0" required />
        </label>
        <br />
        <label>
          Species:
          <input type="text" name="species" value={formData.species} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Owner:
          <input type="text" name="owner" value={formData.owner} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Add Patient</button>
      </form>
    </div>
  );
};

export default AddPatientForm;