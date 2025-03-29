import React, { useState } from "react";
import "./App.css";
import ChatWindow from "./components/ChatWindow";
import logo from './assets/logo.png';

function App() {

  return (
    <div className="App">
      <div className="heading">
        <img src={logo} alt="PartSelect Logo" className="logo" />
        PartSelect Customer Service Chat
      </div>
        <ChatWindow/>
    </div>
  );
}

export default App;
