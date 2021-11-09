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

const PrivateRoute = ({ children }) => {  
  return isAuthenticated()  ? children : <Navigate to="/signIn" />;
}

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/signUp' element={<SignUp />} />
          <Route
            path='/signIn'
            /*element={
              !isAuthenticated() ? (<SignIn />) : (<Navigate to={{ pathname: "/" }} />)
            }*/
            element={<SignIn />}
          />
          <Route
          element={
            <PrivateRoute>
              <Home socket={socket}/>
            </PrivateRoute>
          }
          path="/" />
          <Route
            element={
              <PrivateRoute>
                <TwitchChat socket={socket}/>
              </PrivateRoute>
            }
            path="/chat"
          />
        </Routes>    
      </div>
    </BrowserRouter>
  </Provider>
  );
}

export default App;