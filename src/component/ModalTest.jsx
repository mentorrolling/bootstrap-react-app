import React from "react";
import { Modal } from "react-bootstrap";
import FormUpdateProd from "./FormUpdateProd";
import MensajeDelete from "./modales/MensajeDelete";

export default function ModalTest(props) {
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        centered="true"
      >
        {props.dato.action === "actualizar" && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Actualiza Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormUpdateProd
                handleClose={props.handleClose}
                dato={props.dato.id}
                getProductos={props.getProductos}
              />
            </Modal.Body>
          </>
        )}
        {props.dato.action === "borrar" && (
          <MensajeDelete
            handleClose={props.handleClose}
            dato={props.dato.id}
            getProductos={props.getProductos}
          />
        )}
      </Modal>
    </>
  );
}
