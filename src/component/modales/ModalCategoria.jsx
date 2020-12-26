import React from "react";

import { Modal } from "react-bootstrap";
import FormAddCategoria from "../formularios/categorias/FormAddCategoria";
import FormDeleteCategoria from "../formularios/categorias/FormDeleteCategoria";

export default function ModalCategoria(props) {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} centered>
        {props.modalType.tipo === "add" && (
          <FormAddCategoria
            handleClose={props.handleClose}
            actualizaCategoria={props.actualizaCategoria}
          />
        )}
        {props.modalType.tipo === "delete" && (
          <FormDeleteCategoria
            handleClose={props.handleClose}
            id={props.modalType.id}
            actualizaCategoria={props.actualizaCategoria}
          />
        )}
      </Modal>
    </>
  );
}
