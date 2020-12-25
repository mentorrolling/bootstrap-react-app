import React, { useEffect, useState } from "react";

import { Navbar, Nav, Form, Button } from "react-bootstrap";
import "../css/tabla.css";
import Logo from "../images/logo.png";
export default function NavBarTest({ setLogout }) {
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("token")) || "");
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <div className="container">
          <Navbar.Brand>
            <img id="imagenLogo" src={Logo} alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto mr-2">
              {/* <Nav.Link href="#home">
              <i className="fas ad"></i>
              Home
            </Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link> */}
            </Nav>
            <Form inline>
              <Button
                variant="outline-info"
                onClick={() => {
                  setToken("");
                  localStorage.clear();
                  setLogout(true);
                }}
              >
                <i className="fa fa-sign-out" aria-hidden="true"></i>
              </Button>
              {/* {token === "" ? (
              <Button variant="outline-success" onClick={handleShow}>
                Loguearse
              </Button>
            ) : (
              <Button
                variant="outline-secondary"
                onClick={() => {
                  setToken("");
                  localStorage.clear();
                 
                }}
              >
                Salir
              </Button>
              // <span className="text-white">Hello!</span>
            )} */}
            </Form>
          </Navbar.Collapse>
        </div>
      </Navbar>
      {/* <ModalTest handleClose={handleClose} show={show} /> */}
    </>
  );
}
