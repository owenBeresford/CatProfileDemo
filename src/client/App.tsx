/// <reference types="react-scripts" />
import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="Get a proper logo" />
        print "Hello world" // you never get to see this text unless the JS has
        crashed
      </header>
    </div>
  );
}

export default App;
