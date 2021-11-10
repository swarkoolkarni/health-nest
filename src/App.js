import React from "react";
import {
  Navbar,
  NavbarToggler,
  Collapse,
  Nav,
  NavLink,
  NavItem,
} from "reactstrap";
import { AccountCircleOutlined } from "@material-ui/icons";
import Body from "./Body";

function App() {
  return (
    <div className="container-fluid">
      <Navbar
        expand="md"
        light
        style={{
          backgroundColor: "#0eb798",
        }}
      >
        <NavbarToggler />
        <Collapse navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/components/">Feed</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">Communities</NavLink>
            </NavItem>
          </Nav>
          <div class="mx-auto">
            <a href="#" className="navbar-brand">
              HealthNest
            </a>
          </div>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
            />
          </form>
          <AccountCircleOutlined style={{ fontSize: 40 }} />
        </Collapse>
      </Navbar>
      <Body />
    </div>
  );
}

export default App;
