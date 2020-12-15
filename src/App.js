import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ModalTest from "./component/ModalTest";
import NavBarTest from "./component/NavBarTest";

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <NavBarTest />
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <ModalTest handleClose={handleClose} show={show} />
    </>
  );
}

export default App;
