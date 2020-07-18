import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./styles/styles.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <h1>Hello World</h1>
      </div>
    </Router>
  );
};

export default App;
