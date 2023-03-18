// imports
const db_fun = require("./db_functions");
const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();
let sql;

// necessary express stuff for things
const cors = require("cors");
app.use(express.json());
app.use(cors());

// connect to database
const db = new sqlite3.Database(
  "./test.sqlite3",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err.message);
  }
);

// SEARCH ALL
app.get("/getUsers", async (req, res) => {
  const users = await db_fun.db_getUsers();
  res.json(users);
});

// SEARCH
app.get("/selectUser/:id", async (req, res) => {
  const user = await db_fun.db_selectUser(req.params.id);
  res.json(user);
});

// CREATE
app.post("/createUser", async (req, res) => {
  const user = await db_fun.db_create(req.body);
  res.json(user);
});

// UPDATE (not implemented in front end)
app.patch("/updateUser/:id", async (req, res) => {
  const id = await db_fun.db_update(req.params.id, req.body);
  res.json(id); //
});

// DELETE
app.delete("/deleteUser/:id", async (req, res) => {
  const rnum = await db_fun.db_delete(req.params.id);
  if (rnum > 0) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// ensures server is running
app.listen(3001, () => {
  console.log("server runs good :)");
});

// displays table to console for testing purposes
sql = `SELECT * FROM players`;
db.all(sql, [], (err, rows) => {
  if (err) return console.error(err.message);
  rows.forEach((row) => {
    console.log(row);
  });
});
