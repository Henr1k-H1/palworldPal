import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import "./index.css";

import Dashboard from "./components/Dashboard";
import BreedingCombos from "./components/BreedingCombos";
import BreedingParing from "./components/BreedingParing";

const App = () => {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Palworld Pal
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard" >
                  Pals
                </Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link" to="/combos" >
                Combos
                </Link>
                </li>
                <li className="nav-item">
              <Link className="nav-link" to="/pairing" >
                Pairing
                </Link>
                </li>
            </ul>
          </div>
        </div>
      </nav>

      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/combos">
          <BreedingCombos />
        </Route>
        <Route exact path="/pairing">
          <BreedingParing />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
