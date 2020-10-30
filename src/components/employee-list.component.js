import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class EmployeeList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveEmployees = this.retrieveEmployees.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveEmployee = this.setActiveEmployee.bind(this);
        this.searchTitle = this.searchTitle.bind(this);
        this.newEmployee = this.newEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);

        this.state = {
            employees: [],
            currentEmployee: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.retrieveEmployees();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    retrieveEmployees() {
        EmployeeDataService.getAll()
            .then(response => {
                this.setState({
                    employees: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveEmployees();
        this.setState({
            currentEmployee: null,
            currentIndex: -1
        });
    }

    newEmployee() {
        EmployeeDataService.get(0)
            .then(response => {
                this.setState({
                    currentEmployee: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    editEmployee(id) {
        EmployeeDataService.get(id)
            .then(response => {
                this.setState({
                    currentEmployee: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    saveEmployee() {

        if (this.state.currentEmployee.id > 0) {
            EmployeeDataService.update(
                this.state.currentEmployee.id,
                this.state.currentEmployee
            )
                .then(response => {
                    console.log(response.data);
                    this.setState({
                        message: "The employee was updated successfully!"
                    });
                })
                .catch(e => {
                    console.log(e);
                });
        }
        else {
            EmployeeDataService.create(
                this.state.currentEmployee
            )
                .then(response => {
                    console.log(response.data);
                    this.setState({
                        message: "The employee was updated successfully!"
                    });
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    deleteEmployee(id) {
        EmployeeDataService.delete(id)
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    setActiveEmployee(employee, index) {
        this.setState({
            currentEmployee: employee,
            currentIndex: index
        });
    }

    searchTitle() {
        EmployeeDataService.findByName(this.state.searchTitle)
            .then(response => {
                this.setState({
                    employees: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { searchTitle, employees, currentEmployee, currentIndex } = this.state;

        return (
            <div>
                <div className="list row">
                    <div className="col-md-6 col-sm-12 searchbox">
                        <b className="heading">AFFINITY ID</b>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control"
                                placeholder="Search" value={searchTitle}
                                onChange={this.onChangeSearchTitle} />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary"
                                    type="button" onClick={this.searchTitle}> Search </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <button className="nav-link addbutton" onClick={() => this.newEmployee()}> CREATE A NEW EMPLOYEE </button>
                    </div>
                </div>

                <div className="list row">

                    <div className="col-md-6 col-sm-12">
                        <h4>Sort By:</h4>

                        {employees && employees.map((employee, index) => (
                            <div onClick={() => this.setActiveEmployee(employee, index)}
                                className={
                                    "row " +
                                    (index === currentIndex ? "listActive p-3 mb-5 rounded" : "shadow p-3 mb-5 bg-white rounded")
                                }
                            >
                                <div className="col-md-4">
                                    <h2><b>{employee.role}</b></h2>
                                </div>
                                <div className="col-md-8"></div>
                                <div className="col-md-4">
                                    <img src={employee.profilePic} alt="Avatar"></img>
                                </div>
                                <div className="col-md-8">
                                    <b>{employee.employeeName}</b> <br></br>
                                    <b>{employee.role}</b> <br></br>
                                    <p>{employee.team}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="col-md-6 col-sm-12">
                        {currentEmployee ? (
                            <div className="row shadow p-3 mb-5 bg-white rounded">
                                <div className="col-md-12 center-align">
                                    <img src={currentEmployee.profilePic} alt="Avatar"></img>
                                </div>
                                <div className="col-md-12 center-align">
                                    <h2>{currentEmployee.employeeName}</h2>
                                </div>
                                <div className="col-md-12 center-align">
                                    <h6>{currentEmployee.email}</h6>
                                </div>
                                <div className="col-md-12 center-align">
                                    <button className="btn btn-inverse" onClick={() => this.editEmployee(currentEmployee.employeeID)}>
                                        <FontAwesomeIcon icon="pen" />
                                    </button>

                                    <button className="btn btn-inverse" onClick={() => this.deleteEmployee(currentEmployee.employeeID)}>
                                        <FontAwesomeIcon icon="times" />
                                    </button>
                                </div>
                                <div className="col-md-6 center-align">
                                    <label>
                                        <strong>Role</strong>
                                    </label>{" "} <br></br>
                                    {currentEmployee.role}
                                </div>
                                <div className="col-md-6 center-align">
                                    <label>
                                        <strong>Team</strong>
                                    </label>{" "} <br></br>
                                    {currentEmployee.team}
                                </div>
                                <div className="col-md-6 center-align">
                                    <label>
                                        <strong>Address</strong>
                                    </label>{" "} <br></br>
                                    {currentEmployee.address}
                                </div>
                                <div className="col-md-6 center-align">
                                    <label>
                                        <strong>City</strong>
                                    </label>{" "} <br></br>
                                    {currentEmployee.city}
                                </div>
                                <div className="col-md-12 center-align">

                                    <div className="sharebutton">
                                        <Link to={"/add"} className="nav-link"> SHARE </Link>
                                    </div>

                                </div>

                            </div>
                        ) : (
                                <div>
                                    <br />
                                    <p>Please click on a Employee...</p>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        );
    }
}