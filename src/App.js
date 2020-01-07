import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";
import "./App.css";
import Routes from "./Routes";

function App(props) {
  const [isAuthenticated, setAuthentication] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      setAuthentication(true);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }
    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();

    setAuthentication(false);
    props.history.push("/login");
  }

  return (
    !isAuthenticating && (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/"> Scratch !</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {isAuthenticated ? (
                <NavItem onClick={handleLogout}>Logout</NavItem>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <NavItem href="/signup">Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem href="/login">Login</NavItem>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Routes appProps={{ isAuthenticated, setAuthentication }} />
      </div>
    )
  );
}

export default withRouter(App);
