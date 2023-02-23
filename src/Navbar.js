import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

function NavBar({loggedin}) {
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
        
            <Nav className="ml-right" navbar>
            <NavItem>
                <NavLink to="/jobs">Jobs</NavLink>
            </NavItem>
            </Nav>
            
            <Nav className="ml-right" navbar>
            <NavItem>
                <NavLink to="/companies">Companies</NavLink>
            </NavItem>
            </Nav>
        </React.Fragment>
        
        :
        <React.Fragment>
            <div class="navbar-collapse collapse w-100 order-0 dual-collapse2">
            <ul class="navbar-nav ml-auto">
            <li class="nav-item">
            <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink to="/login">Login</NavLink>
            </NavItem>
            </Nav>
            </li>
            <li class="nav-item">
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
