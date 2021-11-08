import React, { useState } from "react";
import "./style.scss";
import { setUser } from '../../store/action/userAction'
import { useDispatch } from 'react-redux'
import { login, isAuthenticated } from '../../utils/Auth'
import { Link, useNavigate } from "react-router-dom";


function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  let navigate = useNavigate();

  if (isAuthenticated()) {
    navigate('/')
  }

  const callApi = () => {
    try {
      fetch('http://localhost:5000/users/getUser', {
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
            login(userName)
            window.localStorage.setItem("user", userName)
            dispatch(setUser(userName))
            navigate('/')
          }
          else {
            alert("Error ! userName or Password are not good !")
          }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="home">
      <h1>Twitch chat clone</h1>
      <p>Connexion</p>
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
        onClick={event => (!userName || !password) ? (event.preventDefault(), alert("Error ! user or channel are missing !")) : callApi()
        }
        type="submit">Connexion
      </button>
      <button
        onClick={() => navigate('/signUp')}
        type="submit">Sign Up
      </button>
    </div>
  );
}

export default SignIn;
