import React, { useState } from "react";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";


function SignUp() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const callApi = () => {
    try {
      fetch('http://localhost:5000/users/createUser', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: userName,
          password: password,
        }),
      })
      .then((response) => {
          if (response.status !== 404){
            navigate('/')
          }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="home">
      <h1>Create account</h1>
      <input
        placeholder="User name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={event => (!userName || !password) ? (event.preventDefault(), alert("Error ! user or password are missing !")) : callApi()
        }
        type="submit">Create
      </button>
    </div>
  );
}

export default SignUp;
