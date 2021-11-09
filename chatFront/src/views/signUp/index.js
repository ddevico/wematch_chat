import React, { useState } from "react";
import "../../App.scss";
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
          if (response.status !== 404) {
            navigate('/')
          }
          else {
            alert("User already exists !")
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="form-style">
      <h1>Twitch chat clone</h1>
      <p>Create account</p>
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
      <a onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Return</a>
    </div>
  );
}

export default SignUp;
