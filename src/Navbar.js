import React from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

function NavBar({loggedin, logout}) {
    const history = useNavigate()
  return (
    
    <div>
      <Navbar expand="md">
        <Nav className="navbar-brand ml-left" navbar>
            <NavItem>
                <NavLink to="/">Jobly</NavLink>
            </NavItem>
        </Nav>
        {loggedin ?
        <React.Fragment>
        
            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink to="/jobs">Jobs</NavLink>
                            </NavItem>
                        </Nav>
                    </li>
                    <li className="nav-item">
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink to="/companies">Companies</NavLink>
                            </NavItem>
                        </Nav>
                    </li>
                    <li className="nav-item">
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink to="/user">User Info</NavLink>
                            </NavItem>
                        </Nav>
                    </li>
                    <li className="nav-item">
                        <button className=" btn btn-dark btn-sm ml-auto" onClick={() => {
                            console.log("logging out")
                            logout()
                            history('/') }}>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </React.Fragment>
        
        :
        <React.Fragment>
            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink to="/login">Login</NavLink>
                            </NavItem>
                        </Nav>
                    </li>
                    <li className="nav-item">
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink to="/register">Register</NavLink>
                            </NavItem>
                        </Nav>
                    </li>
                </ul>
            </div>
        </React.Fragment>
        }
        

      </Navbar>
      
    </div>
  );
}

export default NavBar;
