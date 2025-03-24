const sqlite3 = require("sqlite3").verbose();

// Open database connection
const db = new sqlite3.Database("./vet_admin.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(" Database connection error:", err);
    } else {
        console.log(" Connected to SQLite database.");
    }
});

// Ensure database and table exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS patients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age INTEGER NOT NULL,
            species TEXT NOT NULL,
            owner TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error(" Error creating table:", err);
        } else {
            console.log(" Table verified/created.");
        }
    });

    // Check if data exists before inserting
    db.get("SELECT COUNT(*) AS count FROM patients", (err, row) => {
        if (err) {
            console.error(" Error checking data:", err);
        } else if (row.count === 0) {
            console.log("ℹ️ No data found, inserting sample records...");
            db.run("INSERT INTO patients (name, age, species, owner) VALUES ('Bella', 3, 'Dog', 'Alice')");
            db.run("INSERT INTO patients (name, age, species, owner) VALUES ('Charlie', 5, 'Cat', 'Bob')");
        } else {
            console.log(" Database already has data, skipping insert.");
        }
    });
});

module.exports = db;
