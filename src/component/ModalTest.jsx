import React from "react";
import { Modal } from "react-bootstrap";
import FormUpdateProd from "./FormUpdateProd";

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
          <Modal.Title>Actualiza Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormUpdateProd
            handleClose={props.handleClose}
            dato={props.dato}
            getProductos={props.getProductos}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
