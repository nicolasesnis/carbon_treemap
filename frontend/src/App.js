import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";


function App() {
  const [getMessage, setGetMessage] = useState({});

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_DOMAIN + "/api")
      .then((response) => {
        setGetMessage(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      {getMessage.status === 200 ? (
        <div>
          <Router>
            <Route exact path="/" component={Home}  ></Route>
          </Router>
        </div> 
      ) : (
        <h3>LOADING</h3>
      )}
    </div>
  );
}

export default App;
