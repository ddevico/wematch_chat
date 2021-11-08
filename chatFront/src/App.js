import TwitchChat from "./views/twitchChat";
import Home from "./views/home";
import SignIn from "./views/signIn";
import SignUp from "./views/signUp";
import { Routes, BrowserRouter, Route, Navigate} from 'react-router-dom';
import rootReducers from "./store/reducer/index";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { isAuthenticated } from "./utils/Auth"
import "./App.scss";
import React from "react";
import io from "socket.io-client";

const socket = io.connect('/');
const store = createStore(rootReducers);

const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/signUp' element={<SignUp />} />
          <Route
            path='/signIn'
            element={!isAuthenticated() ? (<SignIn />) : (<Navigate to={{ pathname: "/" }} />)}
            />
          <Route
            path='/'
            element={<Home socket={socket}/>}
          />
          <Route
            path="/chat"
            element={isAuthenticated() ? (<TwitchChat socket={socket}/>) : (<Navigate to={{ pathname: "/signIn" }} />)}
          />
        </Routes>    
    </div>
</BrowserRouter>
</Provider>
  );
}

export default App;