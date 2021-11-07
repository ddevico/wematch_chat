import TwitchChat from "./views/twitchChat";
import Home from "./views/home";
import { Routes, BrowserRouter, Route} from 'react-router-dom';
import rootReducers from "./store/reducer/index";
import { createStore } from "redux";
import { Provider } from "react-redux";
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
          <Route path='/' element={<Home socket={socket}/>} />
          <Route path="/chat" element={<TwitchChat socket={socket}/>} />
        </Routes>    
    </div>
</BrowserRouter>
</Provider>
  );
}

export default App;