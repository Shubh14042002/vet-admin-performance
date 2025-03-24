const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/patients", (req, res) => {
    db.all("SELECT * FROM patients", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});
//  API to Add a New Patient
app.post("/patients", (req, res) => {
    const { name, age, species, owner } = req.body;
    db.run(
        "INSERT INTO patients (name, age, species, owner) VALUES (?, ?, ?, ?)",
        [name, age, species, owner],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({ id: this.lastID });
        }
    );
});

//  API to Delete a Patient
app.delete("/patients/:id", (req, res) => {
    db.run("DELETE FROM patients WHERE id = ?", req.params.id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Patient deleted" });
    });
});

app.listen(3001, "0.0.0.0", () => {
    console.log("Server running on http://localhost:3001");
  });
