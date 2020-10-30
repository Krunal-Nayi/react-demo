import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link } from "react-router-dom";

import AddEmployee from "./components/add-employee.component";
import Employee from "./components/employee.component";
import EmployeeList from "./components/employee-list.component";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faPen, faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faCoffee, faPen, faTimes)

class App extends Component {
  render() {
    return (
      <div>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/Employee"]} component={EmployeeList} />
            <Route exact path="/add" component={AddEmployee} />
            <Route path="/Employee/:id" component={Employee} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
