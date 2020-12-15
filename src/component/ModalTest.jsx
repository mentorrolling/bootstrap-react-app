import React from "react";
import { Modal, Button } from "react-bootstrap";
import FormRegistro from "./FormRegistro";
export default function ModalTest(props) {
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        centered="true"
      >
        <Modal.Header closeButton>
          <Modal.Title>Registrate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormRegistro />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}
