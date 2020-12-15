import React, { useState } from "react";
import ModalTest from "./ModalTest";
import { Navbar, Nav, Form, Button } from "react-bootstrap";

export default function NavBarTest() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto mr-2">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
          <Form inline>
            {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
            <Button variant="outline-success" onClick={handleShow}>
              Registrate
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <ModalTest handleClose={handleClose} show={show} />
    </>
  );
}
