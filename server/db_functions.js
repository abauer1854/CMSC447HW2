const knex = require("./knex");

// create player using SQL
function db_create(player) {
  // if (db_search(db, id)) {
  //   console.log("User with id: " + id + " already exists in database!");
  //   return false;
  // }
  // let sql = `INSERT INTO players(first_name,last_name,id,points) VALUES(?,?,?,?)`;
  // db.run(sql, [first_name, last_name, id, points], (err) => {
  //   if (err) return console.error(err.message);
  // });
  return knex("players").insert(player);
}

// delete player using SQL
function db_delete(id) {
  // let sql = `DELETE FROM players WHERE id=?`;
  // db.run(sql, [id], (err) => {
  //   if (err) return console.error(err.message);
  // });
  return knex("players").where("id", id).del();
}

// Create Table
// sql = `CREATE TABLE players(first_name,last_name,id,points)`;
// db.run(sql);

// Drop table
// db.run("DROP TABLE players");

// update player using SQL
function db_update(id, player) {
  // sql = `UPDATE players SET first_name = ? WHERE id = ?`;
  // db.run(sql, ["Steve", 1], (err) => {
  //   if (err) return console.error(err.message);
  // });
  return knex("players").where("id", id).update(player);
}

// get all users using SQL
function db_getUsers() {
  // let sql = `SELECT * FROM players`;
  // db.all(sql, [], (err, rows) => {
  //   if (err) return console.error(err.message);
  //   rows.forEach((row) => {
  //     console.log(row);
  //   });
  // });
  return knex("players").select("*");
}

// get individual user using SQL
function db_selectUser(id) {
  // let sql = `SELECT * FROM players WHERE id = ?`;
  //   // db.all(sql, [], (err, row) => {
  //   //   if (err) return console.error(err.message);
  //   //   return row;
  //   // });
  return knex
    .select("first_name", "last_name")
    .from("players")
    .where("id", id)
    .then((row) => row);
}

// export functions
module.exports = {
  db_create,
  db_delete,
  db_update,
  db_getUsers,
  db_selectUser,
};
