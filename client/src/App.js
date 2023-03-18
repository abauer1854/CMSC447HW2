import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [listofUsers, setListOfUsers] = useState([]);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [id, setID] = useState(0);
  const [points, setPoints] = useState(0);

  // display list of users
  useEffect(() => {
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  // create user
  const createUser = () => {
    Axios.post("http://localhost:3001/createUser", {
      first_name: first_name,
      last_name: last_name,
      id: id,
      points: points,
    }).then((response) => {
      alert("User Created :)");
      setListOfUsers([...listofUsers, { first_name, last_name, id, points }]);
    });
  };

  // select user and display with alert
  const selectUser = () => {
    Axios.get("http://localhost:3001/selectUser/" + id, {
      id: id,
    }).then((response) => {
      //var obj = JSON.parse(response.data);
      alert(
        "User is: " +
          response.data[0].first_name +
          " " +
          response.data[0].last_name
      );
    });
  };

  // delete user from db
  const deleteUser = () => {
    Axios.delete("http://localhost:3001/deleteUser/" + id, {
      id: id,
    }).then((response) => {
      if (response.data.success === true) {
        alert("User Deleted (Refresh Page)");
      } else {
        alert("User not Found!");
      }
    });
  };

  // html stuff
  return (
    <div className="App">
      <h1>super awesome super cool crud app</h1>
      <h1>made by aiden bauer</h1>
      <div className="usersDisplay">
        <div>
          <h3>insert user: </h3>
          <input
            type="text"
            placeholder="First..."
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Last..."
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
          <input
            type="number"
            placeholder="ID..."
            onChange={(event) => {
              setID(event.target.value);
            }}
          />
          <input
            type="number"
            placeholder="Points..."
            onChange={(event) => {
              setPoints(event.target.value);
            }}
          />
          <button onClick={createUser}> Create User</button>
        </div>
        <div>
          <h3>delete user by id: </h3>
          <input
            type="number"
            placeholder="ID..."
            onChange={(event) => {
              setID(event.target.value);
            }}
          />
          <button onClick={deleteUser}> Delete User</button>
        </div>
        <div>
          <h3>Select/view user by id: </h3>
          <input
            type="number"
            placeholder="ID..."
            onChange={(event) => {
              setID(event.target.value);
            }}
          />
          <button onClick={selectUser}> Select User</button>
        </div>
        <h2>List of Users</h2>
        {listofUsers.map((user) => {
          return (
            <div>
              <h3>
                Name: {user.first_name + " " + user.last_name}, ID: {user.id},
                Points: {user.points}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
