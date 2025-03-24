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

app.listen(3000,"0.0.0.0", () => {
    console.log("Server running on http://localhost:3000");
});
