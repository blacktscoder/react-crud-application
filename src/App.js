import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddFinancial from "./components/AddFinancial";
import Financial from "./components/Financial";
import FinancialList from "./components/FinancialList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/financial" className="navbar-brand">
          LifeCheq Company
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/financial"} className="nav-link">
              Financial Plan
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add Plan
            </Link>
          </li>
           <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Edit Plan
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/financial"]} component={FinancialList} />
          <Route exact path="/add" component={AddFinancial} />
          <Route path="/financial/:id" component={Financial} />
        </Switch>
      </div>
    </div>
  );
}

export default App;