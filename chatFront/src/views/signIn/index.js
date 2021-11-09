import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/')
    }
  }, [])

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
            dispatch(setUser(userName))
            navigate('/')
          }
          else {
            alert("Error ! UserName or Password are not good !")
          }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="sign-in">
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
        onClick={event => (!userName || !password) ? (event.preventDefault(), alert("Error ! UserName or password are missing !")) : callApi()
        }
        type="submit">Connexion
      </button>
      <a onClick={() => navigate('/signUp')} style={{cursor: 'pointer'}}>Not registered yet ? Create one here!</a>
    </div>
  );
}

export default SignIn;
