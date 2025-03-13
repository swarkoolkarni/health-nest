import React from "react";
import {
  Navbar,
  NavbarToggler,
  Collapse,
  Nav,
  NavLink,
  NavItem,
  NavbarBrand,
} from "reactstrap";
import { AccountCircleOutlined } from "@material-ui/icons";
import { AppContainer } from "./Container";

function App() {
  return (
    <div>
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
              <NavLink href="/">
                <b>Feed</b>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">
                <b>Communities</b>
              </NavLink>
            </NavItem>
          </Nav>
          <NavbarBrand className="mx-auto">
            <a href="#" className="navbar-brand">
              <b>Health-Nest</b>
            </a>
          </NavbarBrand>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2 br-2"
              type="search"
              placeholder="Search"
            />
          </form>
          <AccountCircleOutlined style={{ fontSize: 40 }} />
        </Collapse>
      </Navbar>
      <AppContainer />
    </div>
  );
}

export default App;
