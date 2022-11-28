import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    event.target.reset();
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const newUser = [...users, data];
        setUsers(newUser);
      })
      .catch((err) => console.error(err));
    console.log(user);
  };
  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <input type="text" name="name" placeholder="name" />
        <br />
        <input type="text" name="email" placeholder="email" />
        <br />
        <input type="submit" value="Add" />
      </form>
      <h2>{users.length}</h2>
      <div>
        {users.map((use) => (
          <p key={use._id}>{`${use.name} ${use.email} ${use._id}`}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
