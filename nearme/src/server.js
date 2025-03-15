const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "mysql",
  user: "user",
  password: "password",
  database: "nearme",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// Get all friends
app.get("/api/friends", (req, res) => {
  db.query("SELECT * FROM friends", (err, results) => {
    if (err) {
      res.status(500).json({ error: "Database query error" });
    } else {
      res.json(results);
    }
  });
});

// Send a friend request
app.post("/api/friends", (req, res) => {
  const { name, status } = req.body;
  db.query(
    "INSERT INTO friends (name, status) VALUES (?, ?)",
    [name, status],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: "Database insert error" });
      } else {
        res.json({ message: "Friend request sent", id: results.insertId });
      }
    }
  );
});

// Update friend/group info
app.put("/api/friends/:id", (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;
  db.query(
    "UPDATE friends SET name=?, status=? WHERE id=?",
    [name, status, id],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: "Database update error" });
      } else {
        res.json({ message: "Friend updated successfully" });
      }
    }
  );
});

// Delete a friend
app.delete("/api/friends/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM friends WHERE id=?", [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Database delete error" });
    } else {
      res.json({ message: "Friend removed successfully" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
